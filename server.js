// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/timestamp/:date_string?", function (req, res) {
  const dateString = req.params.date_string;
  
  if (!dateString){
    return res.json({"unix": new Date().getTime(), "utc" : new Date().toUTCString() });
  }
  
  if (/\b\d{5,}\b/.test(dateString)){
    const parsed_date = new Date(parseInt(dateString));
  
    if (parsed_date.toString() === "Invalid Date"){
      return res.json({ error: "Invaid Date" })
    }
    
    return res.json({"unix": parsed_date.getTime(), "utc" : parsed_date.toUTCString() });
  }
  
  const date = new Date(dateString).toString();
  
  if (date === 'Invalid Date'){
    return res.json({error: date})
  }
  
  return res.json( {"unix": new Date(dateString).getTime(), "utc" : new Date(dateString).toUTCString()} );
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});