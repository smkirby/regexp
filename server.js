// server.js
// where the node app starts

var assets = require("./assets");

const express = require('express');
const bodyParser = require("body-parser");
const querystring = require("querystring");
const fs = require('fs');
const app = express(); 



app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/assets", assets);

app.get('/', function(request, response) {
  
  // send page to user. The URL will be something like: https://regexp.glitch.me/
  
  response.sendFile(__dirname + '/views/index.html');
  console.log('participant served');
  
}); 

app.post('/store_data', function(request, response) {

  // append any data sent back to the csv file (from the post request in script.js)
  
  fs.writeFileSync(__dirname + '/data.csv', request.body.data, {flag:'a'});

  console.log('data written! '+request.body.data);
  response.send("data written");

});

app.get('/data.csv', function(request, response) {

  // let us see the csv file
  // url will be something like: https://regexp.glitch.me/data.csv
  
  response.sendFile(__dirname + '/data.csv');

});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
