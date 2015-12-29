//** Dependencies **//
var forecastAPI = require(appRoot + '/src/app/api/forecast_API');
var usbAPI = require(appRoot + '/src/app/api/usb_API');

//** Object **//
function sensor(type){
	//sensor info
	this.name = '';
	this.location = '';
	this.type = type;
	this.sensorAPI = _setAPIByType(); //set api function

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
module.exports = sensor;

//** Prototyes **// 
sensor.prototype.getReading = function() {
	
	

	var thisObject = this;
	console.log(readingAPI.getReading);
}

//** Private Functions **//
var _setAPIByType = function() {
	//get reading type
	switch(this.type) {
    case 'local': //usb sensor
        localSensorFunction = new usbAPI();
        return localSensorFunction;
        
        break;
    case 'external': //web service
        externalSensorFunction = new forecastAPI();
        return externalSensorFunction;
        break;
    default:
        //do nothing
	}
}

