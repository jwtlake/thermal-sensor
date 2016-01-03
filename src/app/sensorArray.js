//** Dependencies **//
var sensor = require(appRoot + '/src/app/sensor');
var _ = require('lodash');
var request = require('request');

//** Object **//
var SensorArray = function(){
	this.sensors = [];
}

//** Exports **//
module.exports = SensorArray;

//** Prototyes **// 
SensorArray.prototype.load = function(sensors) {
	this.sensors = sensors;
}

SensorArray.prototype.scan = function() {
	_.forEach(this.sensors, function(n) {
		console.log('name: '+ sensor.name);
	}
}

SensorArray.prototype.report = function() {
	_.forEach(this.sensors, function(n) {
		console.log('name: '+ sensor.name);
	}
}

//** Private Functions **//
// var _loadSensorsFromConfig = function() {

// }
