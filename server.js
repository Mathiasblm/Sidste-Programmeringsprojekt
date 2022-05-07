// import the neccessary libraries
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
var ObjectId = require('mongodb').ObjectId;


// configure express server
app.use(express.static("./"));
//app.use(express.json());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const port = 3001;

// configure database connection:
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

// configure security parameters
const saltRounds = 10;

// get request at root
app.get("/", (request, response) => {
  response.sendFile("/index.html");
});



// Save Mazes
app.post("/saveTheMaze", (request, response) => {
	//console.log("Inserting Maze: " + request.body.Maze);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Maze_Database");
    var myobj = request.body;
    dbo.collection("saved_mazes").insertOne(myobj, function(err, res) {
      if (err) throw err;

      //console.log("Inserted: " + JSON.stringify(myobj))
      response.header("Access-Control-Allow-Origin", "*");
      response.json(myobj);
      db.close();
    });
  });
});

// get total number of mazes
app.get("/numOfMazes", (request, response) => {
	console.log("Finding Mazes... ");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Maze_Database");
    dbo.collection("saved_mazes").find({}).toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
      response.header("Access-Control-Allow-Origin", "*");
      response.json({Mazes: result});
      db.close();
    });
  });
});


// start server
app.listen(port, () => console.log("Listening on port " + port));
