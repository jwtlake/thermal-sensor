//** Dependencies **//
var settings = require(appRoot + '/src/app/config/settings');
var sensorArray = require(appRoot + '/src/app/sensorArray');

// load sensor array from settings
var SensorArray = new sensorArray();
SensorArray.load(settings.get('sensors'));

// start scanning
SensorArray.startScan();

// report
setInterval(function() {
    SensorArray.report();
}, 60000); //every 1 min