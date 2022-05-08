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

// get specific maze
app.get("/displayMaze/:_id", (request, response) => {
	console.log("Finding maze... ");
    //console.log("req parm: " + request.params._id);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    let dbo = db.db("Maze_Database");

    let num = parseInt(request.params._id);
    console.log("req parm: " + request.params._id);

    let myQuery = {_id: num};
    
    console.log(myQuery);
    dbo.collection("saved_mazes")
    
    .find(myQuery)
    .toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
      //response.header("Access-Control-Allow-Origin", "*");
      response.json({result});
      db.close();
    });
  });
});


// // updating maze id
// app.put("/comment", (request, response) => {
// 	console.log("Updating maze id:" + request.body.Id);

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Maze_Database");
//     //var myquery = { Comment: new String(request.body.comment_upd)};
//     var myquery = {  _id: new ObjectId(request.body.Id) };
//     var newvalues = { $set: {Id: request.body.comment_upd} };
//     dbo.collection("comments").updateOne(myquery, newvalues, function(err, obj) {
//       if (err) throw err;

//       console.log("Updated Comment: " + request.body.Id + " to " + request.body.comment_upd)
//       response.header("Access-Control-Allow-Origin", "*");
//       response.json({_id: request.body.Id, Comment: request.body.comment_upd});
//       db.close();
//     });
//   });
// });


// start server
app.listen(port, () => console.log("Listening on port " + port));
