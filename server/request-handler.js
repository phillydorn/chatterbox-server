/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
  var theUrl = require('url');
  var database = [{username: 'phil', 'roomname': 'lobby', text: 'testmessage'}];
  var headers = defaultCorsHeaders;
  var defaultCorsHeaders = {
    "Content-Type": "text/plain",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };


exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.


  var something = theUrl.parse(request.url).pathname;
  // console.log(something)
  // request.on('')

  console.log("Serving request type " + request.method + " for url " + request.url);

  var router = {'/classes/messages': true, '/classes/room1': true};

  if (request.method === 'POST'){
   var statusCode = 201;
    var data='';

    request.on("data", function(chunk){
      data += chunk;
    })

    request.on('end', function(){
      database.push(JSON.parse(data));
    })

   response.writeHead(statusCode, headers);
   response.end(JSON.stringify({results: database}));

  } else if (request.method === 'GET') { 
    
    var statusCode;
     statusCode = 200;
    // if (router[something]){
    //   statusCode = 200; 
    // } else {
    //   statusCode = 404;
    // }
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: database}));

  } else { //options
    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(null);
  }
 
}
