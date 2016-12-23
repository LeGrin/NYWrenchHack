var express = require('express');

var logs = [];

var app = express();
app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});
app.get('/test', function(req, res) {
    res.send("It's a test");
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

    var json = "{'type': 'pause'";
    var time = new Date().toTimeString();
    logs.push(time + ": Pause was called");
    res.send(json);
});

app.get('/VideoTest', function(req, res) {

    var json = "{'type': 'video','id': 'TuDraNCXX_c&list=PLLzr_Xoiq2TftPjkqre7jRtae6HgncL8F'}";
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

app.listen(3001);



var createNotification = function(msgtype, msgid, token){

}


console.log('Listening on port 3001...');