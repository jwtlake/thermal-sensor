//** Dependencies **//
var forecastAPI = require(appRoot + '/src/app/api/forecast_API');
var usbAPI = require(appRoot + '/src/app/api/usb_API');

//** Object **//
var Sensor = function(type, location){
	//sensor info
	this.name = '';
	this.location = location;
	this.type = type;
	this.sensorAPI = _setSensorTypeAPI.call(this);

	//server info
	this.id = '';
	this.key = '';

	//check info
	this.enabled = '';
	this.frequency = '';

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
		case 'local': //usb sensor
			return new usbAPI();
			break;
	    case 'external': //web service
	    	return new forecastAPI(this.location);
			break;
	    default:
			//do nothing
	}
};