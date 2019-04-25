const express = require('express');
const bodyParser = require('body-parser');
const showdown = require('showdown');
const passport = require('passport');
const jwt = require('jwt-simple');
const LocalStrategy = require('passport-local').Strategy

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

converter = new showdown.Converter();

//Well like we said its a simple implementation, so we are using this unsecure process :)
const ADMIN = 'admin';
const ADMIN_PASSWORD = 'mypassword';
const SECRET = 'my53cr3t#4456';

passport.use(new LocalStrategy(function(username, password, done) {
    if (username === ADMIN && password === ADMIN_PASSWORD) {
      done(null, jwt.encode({ username }, SECRET));
      return;
    }
    done(null, false);
}));

app.get('/', function(req, res){
    res.send("Welcome to my markdown API")
})

app.post('/login', passport.authenticate('local',{ session: false }),
    function(req, res){
        res.send("Authenticated");
    }
)

app.post('/convert', 
    passport.authenticate('local',{ session: false, failWithError: true }), 
    function(req, res, next){
    console.log(req.body);

    if(typeof req.body.content == 'undefined' || req.body.content == null){
        res.json(["error", "No data found"]);
    }else{
        text = req.body.content;
        html = converter.makeHtml(text);
        res.json(["markdown", html]);
    }},
    // Return unauthorized message if authentication fails
    function (err, req, res, next) {
        return res.status(401).send({ success: false, message: err })
    }
    );

converter.setOption('simplifiedAutoLink', 'true');      //Set markdown converion option

app.listen(3000, function(){
    console.log("Server running on port 3000")
});