var express = require ('express');
var bodyParser = require ('body-parser');
var app = express();
var fs = require('fs')



var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('example listening at host %s: %s', host, port);
})

app.use(bodyParser.json());
app.use(express.static('public'))


app.all('*', function(req, res, next){
  res.header("Content-Type", "application/json");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-headers", "content-type, accept");
  res.header("access-control-max-age", 10);

  if(req.method === 'OPTIONS'){
    res.status(200).send(null);
  } else {
    return next();
  }
});

app.post('/messages', function(req, res){

  fs.readFile('database.json', {encoding: 'utf8'}, function(err, data) {
    var toWrite = [];
    if (!err) {
      toWrite = JSON.parse(data);
    } 

    req.body.objectId = toWrite.length;
    toWrite.push(req.body);

    fs.writeFile('database.json', JSON.stringify(toWrite), function() {
      res.sendStatus(201);
    });

  }); 
});

app.get('/messages', function(req, res) {
  fs.readFile('database.json', {encoding: 'utf8'}, function(err, data) {
    var t = [];
    if (!err) {
      t = JSON.parse(data);
      t.reverse();
    } 
   res.status(200).send(JSON.stringify({results:t}))
  })
})
