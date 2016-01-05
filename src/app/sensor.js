//** Dependencies **//
var forecastAPI = require(appRoot + '/src/app/api/forecast_API');
var usbAPI = require(appRoot + '/src/app/api/usb_API');

//** Object **//
var Sensor = function(name, location, type, enabled, frequency, server, key, id){
	//sensor info
	this.name = name;
	this.location = location;
	this.type = type;
	this.sensorAPI = _setSensorTypeAPI.call(this);

	//server info
	this.server = server;
	this.key = key;
	this.id = id;

	//check info
	this.enabled = enabled;
	this.frequency = frequency;

	//store
	this.readings = [];
}

//** Exports **//
module.exports = Sensor;

//** Prototyes **// 
Sensor.prototype.getReading = function() {
	var thisObject = this;
	this.sensorAPI.getReading(function(reading) {
		thisObject.readings.push({
			timestamp: new Date(),
			reading: reading
		});
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