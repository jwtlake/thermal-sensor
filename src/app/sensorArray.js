//** Dependencies **//
var Sensor = require(appRoot + '/src/app/sensor');
var _ = require('lodash');
var request = require('request');

//** Object **//
var SensorArray = function(){
	this.sensors = [];
}

//** Exports **//
module.exports = SensorArray;

//** Prototyes **// 
SensorArray.prototype.load = function(sensorList) {
	var thisObject = this;
	//load sensors from settings file
	_.forEach(sensorList, function(sensor) {
		var newSensor = new Sensor(
			sensor.name,
			sensor.location,
			sensor.type,
			sensor.enabled,
			sensor.frequency,
			sensor.server, 
			sensor.key,
			sensor.id
		);
		thisObject.sensors.push(newSensor);
	});
}

SensorArray.prototype.startScan = function() {
	//start scanning for each sensor in the array
	_.forEach(this.sensors, function(sensor) {
		//only scan enabled sensors
		if(sensor.enabled){
			var frequency = parseFloat(sensor.frequency); // in mins
			console.log('**New Sensor: ' + sensor.name + ' -- Type: ' + sensor.type + ' -- Frequency: ' + sensor.frequency + ' min(s)');
			//get new reading every x min
			setInterval(function() {
				console.log('**Getting new reading -- Name: ' + sensor.name);
				sensor.getReading();
			}, (frequency * 60000));
		}
	});
}

SensorArray.prototype.report = function() {
	//check sensor array for readings that need to be sent to the server
	_.forEach(this.sensors, function(sensor) {
		//only check enabled
		if(sensor.enabled){
			console.log('Name: '+sensor.name + ' Readings:' + sensor.readings.length);
			//check for unsent readings
			if(sensor.readings.length > 0)
			{
				//start sending results to the server one reading at a time
				post(sensor.readings);

				function post(readings) {
					//get next reading
					var nextReading = readings.shift();
					
					//post to server
					var url = 'http://' + sensor.server + '/api/sensors/' + sensor.id + '/readings';
					request.post({
						url: url,
						timeout: 4000,
						form: {
							key: sensor.key,
							readingtime: nextReading.timestamp,
							temperature: nextReading.reading
						}
					}, function(err, httpResponse, body) {
						if(err){
							console.log('**Error posting to server: ' + err);
							readings.push(nextReading) // back to reading store queue
						}
						else{
							console.log('**Submited reading to server --  Name: '+sensor.name + ' Id: '+ sensor.id + ' Reading: ' +nextReading.reading + ' TimeStamp: ' +nextReading.timestamp);
							if(typeof readings != 'undefined' && readings.length > 0){
								setTimeout(post(readings), 5000); //wait 5 second and try to send the next reading
							}
						}
					});
				}
			}
		}
	});
}