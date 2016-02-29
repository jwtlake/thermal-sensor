//** Dependencies **//
var forecastAPI = require(appRoot + '/src/app/api/forecast_API');
var usbAPI = require(appRoot + '/src/app/api/usb_API');
var request = require('request');

//** Object **//
var Sensor = function(name, location, type, enabled, frequency, server, key, id, offset){
	//sensor info
	this.name = name;
	this.location = location;
	this.type = type;
	this.offset =  typeof offset !== 'undefined' ?  offset : 0; //set default value
	this.enabled = enabled;
	this.frequency = frequency;
	this.sensorAPI = _setSensorTypeAPI.call(this);

	//server info
	this.server = server;
	this.key = key;
	this.id = id;

	//readings store
	this.readings = [];
}

//** Exports **//
module.exports = Sensor;

//** Prototyes **// 
Sensor.prototype.getReading = function() {
	var thisObject = this;
	this.sensorAPI.getReading(function(reading) {
		//create new reading obj
		var newReading = {
			timestamp: new Date(),
			reading: parseFloat(reading + thisObject.offset).toFixed(2)
		};
		//attempt to send new reading
		thisObject.sendReading(newReading);
	});
}

Sensor.prototype.sendReading = function(reading) {
	var thisObject = this;
	var url = 'http://' + thisObject.server + '/api/sensors/' + thisObject.id + '/readings';
	request.post({
		url: url,
		timeout: 4000,
		form: {
			key: thisObject.key,
			readingtime: reading.timestamp,
			temperature: reading.reading
		}
	}, function(err, httpResponse, body) {
		if(err){
			//fail
			console.log('**Error posting to server: ' + err);
			thisObject.readings.push(reading) // back to reading store queue
			console.log('**Saving to Readings Store.. Count: ' + thisObject.readings.length);
		}
		else{
			//success
			console.log('**Submited reading to server --  Name: '+thisObject.name + ' Id: '+ thisObject.id + ' Reading: ' +reading.reading + ' TimeStamp: ' + reading.timestamp);

			//check for more unsent readings
			if(thisObject.readings.length > 0)
			{
				console.log('**Readings Store count: ' + thisObject.readings.length);
				//wait 1 second and send another reading
				setTimeout(function(){ 
					//get next reading
					var nextReading = thisObject.readings.shift();
					thisObject.sendReading(nextReading);
				}, 1000);
			}
		}
	});
}

//** Private Functions **//
function _setSensorTypeAPI() {
	switch(this.type) {
		case 'usb': //usb sensor
			return new usbAPI();
			break;
	    case 'forecastio': //web service
	    	return new forecastAPI(this.location);
			break;
	    default:
			//do nothing
	}
};