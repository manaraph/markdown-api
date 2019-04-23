const express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send("Welcome to my markdown API")
})

app.listen(3000);