
var theUrl = require('url');
var database = [];
var defaultCorsHeaders = {
  "Content-Type": "application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;


exports.requestHandler = function(request, response) {

  var pathName = theUrl.parse(request.url).pathname;
  // console.log("Serving request type " + request.method + " for url " + request.url);
  var router = {'/': true, '/classes/messages': true, '/classes/room1': true, 
  '/classes/room': true, '/log': true};

  if (request.method === 'POST'){
   var statusCode = 201;
    var data='';

    request.on("data", function(chunk){
      data += chunk;
    })

    request.on('end', function(){
      database.push(JSON.parse(data));
    })
    router[pathName] = true;

   response.writeHead(statusCode, headers);
   response.end(JSON.stringify({results: database}));

  } else if (request.method === 'GET') { 
    
    var statusCode;
    if (router[pathName]){
      statusCode = 200; 
    } else {
      statusCode = 404;
    }
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: database}));

  } else { //options
    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  }
 
}
