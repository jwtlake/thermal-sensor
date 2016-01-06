# thermal-sensor

## Purpuse
Sensor App for reading and reporting home temperature with the Temper1F USB sensor and [forecast.io](http://forecast.io/). Currently this app will only report collected readings to the [thermal-server](https://github.com/jwtlake/thermal-server) project. At some point I hope to add a web component for viewing readings so this could function as a stand alone as well. 

## Usage
- Get your [thermal-server](https://github.com/jwtlake/thermal-server) setup.

- Follow [Lee's](http://lee.smallbone.com/2014/10/using-temper1f-usb-temperature-probe-on-raspberry-pi/) great walkthrough on getting the Temper1F working on your raspberryPi. 

- Download the thermal-sensor project
```
$ git clone https://github.com/jwtlake/thermal-sensor.git
```
- Configure the [settings.js](/src/app/config/settings.js) file with your sensor info and api keys ([Google GeoCoding](https://developers.google.com/maps/documentation/geocoding/intro) && [forecast.io](https://developer.forecast.io/docs/v2)). 

- Run the app!
```
$ node index.js
```
