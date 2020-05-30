projectData = {};

const express = require('express');

const appData = {};

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 8080;

const server = app.listen(port, listening);

function listening() {
	console.log("server running");
	console.log(`running on localhost: ${port}`);
}

//get route

app.get('/', getData);

function getData(req,res){
	res.send(projectData);
	console.log(projectData);
}


//post route

const data = [];

app.post('/addWeather', addWeather);

function addWeather(req,res){
  console.log(req.body)
  newEntry = {
  	temperature: req.body.temperature,
  	date: req.body.date,
  	userResponse: req.body.userResponse
  }
  data.push(newEntry)
  res.send(projectData)
}



