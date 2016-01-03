// 
var settings = require(appRoot + '/src/app/config/settings');
var sensor = require(appRoot + '/src/app/sensor');

var newSensor_ex = new sensor('external','6326 Bonita Rd Lake Oswego, OR 97035');
var newSensor = new sensor('local');

setInterval(function(){
	newSensor_ex.getReading();
	newSensor.getReading();

},10000);

setInterval(function(){
	console.log('Outside');
	console.log(newSensor_ex.readings);
	console.log('Inside:');
	console.log(newSensor.readings);
},5000);


// forcast test
var forecastAPI = require(appRoot + '/src/app/api/forecast_API');
var test = new forecastAPI('6326 Bonita Rd Lake Oswego, OR 97035');
test.getReading(function(reading) {
	console.log(reading);
});





//
var sensor = require(appRoot + '/src/app/sensor');
var newSensor = new sensor('local');
var newSensor_ex = new sensor('external');

console.log(newSensor);
console.log(newSensor_ex);

console.log(newSensor.getReading());
console.log(newSensor_ex.getReading());