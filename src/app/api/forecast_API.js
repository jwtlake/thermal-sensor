// API Wrapper for External Temp service Forcast.io
//Returns current fahrenheit temperature in decimal format

//** Settings **//
var settings = require(appRoot + '/src/app/config/settings');

//** Libaries **//
var geocoder = require('node-geocoder')('google', 'https', {apiKey: settings.get('googleGEO:key'), formatter: null});
var forecast = require('forecast')({
	service: 'forecast.io',
	key: settings.get('forcastIO:key'),
	units: 'f', // fahrenheit
	cache: true, // Cache API request
	ttl: { // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
		minutes: 5,
		seconds: 0
	}
});

//** Object **//
var forecastService = function() {
	this.address = null;
	this.latitude = null;
	this.longitude = null;
};

//** Exports **//
module.exports = forecastService;

//** Prototyes **// 
forecastService.prototype.getReading = function() {
	if(this.latitude == null || this.longitude == null) {
		return _geoRequest() //get lat lng from address
		.then(function() {
			_forcastRequest(); //get forcast for lat lng (return only current temp)
		});
	} else {
		return _forcastRequest(); //get forcast for lat lng (return only current temp)
	}		
};

//** Private Functions **//
var _geoRequest = function() {
	var thisObject = this;
	var lookUpAdress = this.address;
	//get lat and lng from address
	geocoder.geocode(lookUpAdress, function(err, res) {
		//get first result (API allows for multiple requests)
		thisObject.latitude = res[0].latitude;
		thisObject.longitude = res[0].longitude;
	});
}

var _forcastRequest = function() {
	if(this.latitude == null || this.longitude == null) {
		console.log('Error making forcast request: Missing lat and lng.')
		return null;
	}
	
	//get forcast for lat and lng
	forecast.get([this.latitude, this.longitude], true, function(err, weather) {
		if(err) { 
			console.log(err);
			return null;
		} else { 
			var currentTemp = weather.currently.temperature;
			return currentTemp; 
		}
	});
}