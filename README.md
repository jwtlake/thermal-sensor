# thermal-sensor

## Purpuse
Sensor App for reading and reporting home temperature with the Temper1F USB sensor and [forecast.io](http://forecast.io/). Currently this app will only report collected readings to the [thermal-server](https://github.com/jwtlake/thermal-server) project. At some point I hope to add a web component for viewing readings so this could function as a stand alone as well. 

## Usage
- Get your [thermal-server](https://github.com/jwtlake/thermal-server) setup.

- Download and install [Peter's TEMPer Project](https://github.com/petechap/usb-thermometer) to get your usb sensor working

- Download the thermal-sensor project
```
$ git clone https://github.com/jwtlake/thermal-sensor.git
```
- Configure the [settings.js](/src/app/config/settings.js) file with your sensor info and api keys ([Google GeoCoding](https://developers.google.com/maps/documentation/geocoding/intro) && [forecast.io](https://developer.forecast.io/docs/v2)). 

- Run the app!
```
$ node index.js
```

## To Do
- Clean up README.md (better setup documentation)
- Tests!! (Could have saved myself many hours if I would have started with some. haha...)
- UI for inicial configuration
- Fully implement sensor key functionality (client should make a request for a server api key.)
- Come up with a good way to support other sensor brands/models.
- Impliment stand alone logging
- Lots more im sure...
