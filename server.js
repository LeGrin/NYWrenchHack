var express = require('express');
var port = process.env.port || 3001;


var logs = [];

var actions = {};

var app = express();
app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});

var log = function(device,type,id){
    var time = new Date().toTimeString();
    var text = ": Call from " + device + ". Action type " + type + ", id " + id;
    logs.push(time + text);
}

var createJson = function(type, id){
    if (type === 'pause') {return "{'type':'" + type + "'}";}
    else {return "{'type':'" + type + "','id':'" + id + "'}";}
}

app.get('/api/pebble', function(req, res) {
  var device = req.param('dev');
  var type = req.param('type');
  var id = req.param('id') || 0; 
  var target = req.param('target');
  var response = createJson(type,id);
  if (!actions[target]) actions[target] = [];
  actions[target][actions[target].length] = response;
  log(device,type,id);
  console.log(actions);
  res.send("OK. Action #" + actions[target].length + " in list for " + target);
});

app.get('/api/iphone',function(req,res){
    var device = req.param("dev");
    var response = '';
    if (actions[device] && actions[device].length > 0){ response = actions[device].pop();}
    else { response = "{'error':'there's no actions for this device}";}
    logs.push( (new Date().toTimeString()) + ": Device with id: " + device + "got response");
    console.log(response);
    res.send(response);
});


app.get('/AudioTest', function(req, res) {

    var json = "{'type': 'audio','id': '915794179'}";
    var time = new Date().toTimeString();
    logs.push(time + ": AudioTest was called");
    res.send(json);
});

app.get('/PlaylistTest', function(req, res) {

    var json = "{'type': 'playlist','id': 'krutota/idpl.a947d43ee3944e8f999bfdff53b8bf53'}";
    var time = new Date().toTimeString();
    logs.push(time + ": PlaylistTest was called");
    res.send(json);
});

app.get('/Pause', function(req, res) {

    var json = "{'type': 'pause'}";
    var time = new Date().toTimeString();
    logs.push(time + ": Pause was called");
    res.send(json);
});

app.get('/VideoTest', function(req, res) {

    var json = "{'type': 'video','id': 'PLEJ974BqZEiO0aXH2v4aXYxDQckyICi9P'}";
    var time = new Date().toTimeString();
    logs.push(time + ": VideoTest was called");
    res.send(json);
});

app.get('/log', function(req, res) {
    var json = '';
    var time = new Date().toTimeString();
    logs.push(time + ": Log opened");
    logs.forEach(function(line){
        json += line + '</br>';
    });
    res.send(json);
});

app.listen(port);



var createNotification = function(msgtype, msgid, token){

}


console.log('Listening on port 3001...');