var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var fs = require('fs');

var dataPort = 25604;
var webPort = 25605;

var storeFile = 'flimrail1.ctr';

// read from counter file?

var buttonTimes = 0;

fs.readFile(storeFile, function(e, data) {
    if (!e) {
        buttonTimes = data;    
    }
});

console.log('buttonTimes: ' + buttonTimes);


server.on("message", function (msg, rinfo) {
    buttonTimes++;
    //write out to file to store?
    fs.writeFile(storeFile, buttonTimes, function(e) {
        if (e) console.log('Error with writeFile(): ' + e);
    });
});
server.bind(dataPort);

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(buttonTimes + '\n');
}).listen(webPort);
console.log('Data listening on port: ' + dataPort + ' Web Server running at ' + webPort);
