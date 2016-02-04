// API Wrapper for Local USB Temp Sensor
// Returns current fahrenheit temperature in decimal format

//** Dependencies **//
var util = require('util');
var exec = require('child_process').exec;
var child; //do i need this var?

//** Settings **// **Hardcoded need to fix
var unixCommand = appRoot + '/../usb-thermometer/pcsensor';

//** Object **//
var UsbSensor = function(){};

//** Exports **//
module.exports = UsbSensor;

//** Prototyes **//
UsbSensor.prototype.getReading = function(callback) {
	//var reading;
	child = exec(unixCommand, function (error, stdout, stderr) {
		//check for unix errors
		if (error) {
			console.log('exec error: ' + error);
			return;
		}
		//format reading result
		var reading = stdout;
		_format(reading, function(reading) {
			callback(reading);
		});	
	});
};

//** Private Functions **//
function _format(reading, callback) {

	//split into array
	reading = reading.trim(); // remove character return
	var array = reading.split(' '); // split by space characters
		
	//result vales
	var date = array[0]; // 2015/07/26
	var time = array[1]; // 10:55:08
	var type = array[2]; // Temperature
	var reading_F = array[3]; // 78.69F
	var reading_C = array[4]; // 25.94C
	
	//remove temp character
	reading_F  = reading_F.substring(0, reading_F.length - 1);
	reading_C  = reading_C.substring(0, reading_C.length - 1);
	
	//convert to number
	reading_F = parseFloat(reading_F);

	//return
	callback(reading_F);
};
