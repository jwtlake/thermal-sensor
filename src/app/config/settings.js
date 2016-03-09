'use strict';

// libary for settings
var nconf = require('nconf');

// default connection settings
var defaults = {
	hapi:{
		port: 3000
	},
	apiKeys:{
		forcastIO:{
			key: 'xxxx'
			//1000 requests per day
		},
		googleGEO:{
			key: 'xxxx'
			//2500 requests per day - 5 requests per second
		}
	},
	sensors:[
		{
			"name": "Main Room",
			"location": "Behind the TV",
			"type": "usb",
			"enabled": false,
			"frequency": 1,
			"server": "192.168.0.105:3000",
			"key": "72f18b5f6f63b572e58c48d19c957b52",
			"offset": 0
		},
		{
			"name": "Lake Oswego",
			"location": "6000 Meadows Rd, Lake Oswego, OR 97035",
			"type": "forecastio",
			"enabled": false,
			"frequency": 5,
			"server": "192.168.0.105:3000",
			"key": "72f18b5f6f63b572e58c48d19c957b53",
			"offset": 0
		}
	]
};

// load private settings
nconf.file('apiKeys', appRoot + '/src/app/config/apiKeys.json');
nconf.file('sensors', appRoot + '/src/app/config/sensors.json');

// set default settings if private settings cant be found
nconf.defaults(defaults);

// export
module.exports = nconf;
