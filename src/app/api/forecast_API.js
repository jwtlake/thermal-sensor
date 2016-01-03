// API Wrapper for External Temp service Forcast.io
// Returns current fahrenheit temperature in decimal format

//** Settings **//
var settings = require(appRoot + '/src/app/config/settings');

//** Dependencies **//
var geocoder = require('node-geocoder')('google', 'https', {apiKey: settings.get('apiKeys:googleGEO:key'), formatter: null});
var forecastLib = require('forecast')
var forecast = new forecastLib({
	service: 'forecast.io',
	key: settings.get('apiKeys:forcastIO:key'),
	units: 'f', // fahrenheit
	cache: true, // Cache API request
	ttl: { // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
		minutes: 5,
		seconds: 0
	}
});

//** Object **//
var ForecastService = function(address) {
	this.address = address;
	this.latitude = null;
	this.longitude = null;
};

//** Exports **//
module.exports = ForecastService;

//** Prototyes **// 
ForecastService.prototype.getReading = function(callback) {
	var thisObject = this;
	// console.log(thisObject.address + ': [(' + thisObject.latitude +')('+ thisObject.longitude + ')]');
	if(thisObject.latitude == null || thisObject.longitude == null) {
		_geoRequest.call(thisObject, function() { //get lat lng from address
			_forcastRequest.call(thisObject, function(reading) {
				callback(reading);
			}); //get forcast for lat lng (return only current temp)
		});
	} else {
		_forcastRequest.call(thisObject, function(reading) {
			callback(reading);
		}); //get forcast for lat lng (return only current temp)
	}
};

//** Private Functions **//
var _geoRequest = function(callback) {
	var thisObject = this;
	//get lat and lng from address
	if(thisObject.address == null){ console.log('_geoRequest function missing address'); return;}
	geocoder.geocode(thisObject.address, function(err, res) {
		if(!err) { 
			//get first result (API allows for multiple requests)
			thisObject.latitude = res[0].latitude;
			thisObject.longitude = res[0].longitude;
			callback(); 
		} 
		else { console.log('error: ' + err); return; }
	});
}

var _forcastRequest = function(callback) {
	var thisObject = this;
	if(thisObject.latitude == null || thisObject.longitude == null) {
		console.log('Error making forcast request: Missing lat and lng.');
		return;
	}

	//get forcast for lat and lng
	forecast.get([thisObject.latitude, thisObject.longitude], true, function(err, weather) {
		if(err) { 
			console.log(err);
		} else { 
			var currentTemp = weather.currently.temperature;
			// console.log(currentTemp);
			callback(currentTemp);
		}
	});
}