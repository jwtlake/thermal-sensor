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
			sensor.id,
			sensor.offset
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
			console.log('**New Sensor: ' + sensor.name + ' -- Type: ' + sensor.type + ' -- Frequency: ' + sensor.frequency + ' min(s) -- Offset: ' + sensor.offset);
			//get new reading every x min
			setInterval(function() {
				console.log('**Getting new reading -- Name: ' + sensor.name);
				sensor.getReading();
			}, (frequency * 60000));
		}
	});
}