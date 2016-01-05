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
				//console.log('sensor: '+sensor.name+ 'sensor count: ' + sensor.readings.length);
				post(sensor.readings);

				function post(readings) {
					//var thisObject = this;

					// console.log('first check: '+readings);
					console.log('before count: '+ readings.length);
					var nextReading = readings.shift();//_.drop(readings);
					// console.log('after count: '+ readings.length);
					
					//console.log('nextReading: ' + nextReading.toString());

					var url = 'http://' + sensor.server + '/api/sensors/' + sensor.id + '/readings';
					//console.log(url);
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
							console.log('Error posting to server: ' + err);
							readings.push(nextReading) // back to reading store queue
						}
						else{
							//console.log(httpResponse);
							//console.log(body);
							console.log('Success!');
							if(typeof readings != 'undefined' && readings.length > 0){
								console.log('new length: ' + readings.length + ' retry in 5 seconds');
								// console.log('retry in 5 seconds');
								setTimeout(post(readings), 5000); //wait 5 second and try to send the next reading
							}
						}
					});
				}
				// sensor.readings = _.dropWhile(sensor.readings, function(reading) {
				// 	return _sendReadingToServer(sensor.server, sensor.id, sensor.key, reading); //returns true or false
				// });
			}
		}
	});
}

//** Private Functions **//
var _sendReadingToServer = function(server, id, key, reading) {
	console.log('sending');
	return true;
	return false;

	console.log('Sending new reading...');

	// send reading to server via post
	request.post({
			url: 'http://' + server + '/api/sensors/' + id + '/readings', 
			form: {
				key: key,    
				temperature: reading.reading,
				timestamp: reading.timestamp
			}
	}, function(err, httpResponse, body) {		
		if(err){
			console.log(err);
			readings.push(reading) // back to reading store queue
		}
		else{
			//console.log(httpResponse);
			//console.log(body);
			console.log('Success!');
		}
	});
}