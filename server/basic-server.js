/* Import node's http module: */
var http = require("http");
var handleRequest = require('./request-handler.js')

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";

// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(handleRequest.requestHandler);
server.listen(port, ip);
// console.log("Listening on http://" + ip + ":" + port);

// var options = {
//   host: "127.0.0.1",
//   // hostname: "127.0.0.1",
//   port: 3000,
//   path: '../client/index.html'
// }
// var client = http.request(options)

