'use strict';

// libary for settings
var nconf = require('nconf');

// example connection settings
var defaults = {
	hapi:{
		port: 3000
	},
	forcastIO:{
		key: 'f8939532627c8f3127748bd8d371fe19'
		//1000 requests per day
	},
	googleGEO:{
		key: 'AIzaSyDSSjaku-pUuUwT3kbiKmL45J6SWwxaOEQ'
		//2500 requests per day - 5 requests per second
	}
};

// set default settings
nconf.defaults(defaults);

// TODO# add enviorments and hidden connection strings

// export
module.exports = nconf;