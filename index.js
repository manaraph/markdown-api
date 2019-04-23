const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.send("Welcome to my markdown API")
})

app.post('/login', function(req, res){
    res.send("Authenticated");
})

app.post('/convert', function(req, res){
    console.log(req.body);

    if(typeof req.body.content == 'undefined' || req.body.content == null){
        res.json(["error", "No data found"]);
    }else{
        res.json(["markdown", req.body.content]);
    }
    
})

app.listen(3000, function(){
    console.log("Server running on port 3000")
});