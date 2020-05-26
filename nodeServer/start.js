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
/*
app.get('/', function (req, res) {
	res.send('Hello World from node server!');
})

*/

//Movie example

const data = [];

app.post('/', addMovie);

function addMovie(req, res){
	data.push(req.body)
	console.log(data)
}