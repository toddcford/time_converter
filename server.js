// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.json());    
app.use(express.urlencoded()); 

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req,res) => {
  let unix = Date.now();
  let unix_date = new Date(unix)
  let str_date = unix_date.toUTCString();
  res.json({"unix": unix, "utc": str_date})
})

app.get("/api/:date", (req,res) => {
  let date = req.params.date
  if (isNaN(date) ) {
    //valid string date
    let unix_date = Date.parse(date);
    let js_date = new Date(unix_date);
    const str_date  = js_date.toUTCString();
    if (str_date === "Invalid Date") {
      res.json({'error': "Invalid Date"})
    } else {
      res.json({"unix": unix_date, "utc": str_date})
    }
  } else {
    //ms unix date
    let ms = parseInt(date)
    console.log(ms)
    let ms_date = new Date(ms);
    ms_date = ms_date.toUTCString()
    if (ms_date === "Invalid Date") {
      res.json({'error': "Invalid Date"})
    } else {
      res.json({"unix": ms, "utc": ms_date})
    }
  }
    
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
