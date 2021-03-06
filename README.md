# Port Crawler
This app lets you search if a browser can access ports in a given range.

You can modify the url and the port range in the interface.

This application is build using `create-react-app` and `react-scripts`.


### Requirements
- `NodeJS >= v11.13.0`
- `npm >= 6.7.0` _(comes with NodeJS)_


### Installation
- Run `$ npm install`


### Develop
- Run `$ npm start`

This will start a watch server with `react-scripts`.
Everytime you save your changes, 
it will automatically be visible in the browser.

### Build
- Run `$ npm run build`

This will add a directory called `build`.
Use this folder on your web server.


### Other
The folder 'old_server' contains files to test this crawler with.


### Screenshots

#### Port crawler XHR
![alt text][port-xhr]

#### Port crawler iFrame
![alt text][port-iframe]

#### Host crawler XHR
![alt text][host-xhr]


[port-xhr]: docs/port-crawler-xhr-screenshot.png "Port XHR"
[port-iframe]: docs/port-crawler-iframe-screenshot.png "Port Iframe"
[host-xhr]: docs/host-crawler-xhr-screenshot.png "Host XHR"