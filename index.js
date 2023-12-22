const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const crypto = require("crypto");

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const users = [];

users.push({ username: "fcc_test", _id: "5fb5853f734231456ccb3b05" });

let log = [];

let exercisesCount = 0;

users.find((user) => {
  (user === user._id) === "5fb5853f734231456ccb3b05";

  const objectToPush = {
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  };

  if (!objectToPush.date || objectToPush.date === "") {
    objectToPush.date = new Date().toDateString();
  }
  log.push(objectToPush);

  const count = exercisesCount;

  exercisesCount++;

  user.count = count;

  return (user.log = log);
});

// console.log(users[0]);

// const a = { description: "a object", duration: 60, date: "" };

// if (!a.date || a.date === "") {
//   a.date = new Date().toDateString();
//   console.log(a);
// }

// Users Arrays
const usersArray = [];

// ::
//  ==>--------First route end-points----------<==
// ::

// 1- ::POST => /api/users end-point

app.post("/api/users", (req, res) => {
  // username
  const userName = req.body.username;
  //user id - randomly generated
  const userId = crypto.randomBytes(12).toString("hex");

  usersArray.push({ username: userName, _id: userId });

  res.json({ username: userName, _id: userId });
});

// 2- ::GET => /api/users end-point

app.get("/api/users", (req, res) => {
  res.json(usersArray);
});

// ::
//  ==>--------Second route end-points----------<==
// ::

// 1- ::POST => /api/users end-point

app.post("/api/users/:_id/exercises", (req, res) => {
  //excersices log array
  const log = [];
  let matchedUser;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;
  const userIdParam = req.params._id;

  if (!date || date === "") {
    new Date().toDateString();
  }

  /* 
  match the user id from the excercise data to the user
  id in the users array
    */
  usersArray.find((user) => {
    user._id === userIdParam;

    // pusth the exercise data to the log array

    log.push({
      description: String(description),
      duration: parseInt(duration),
      date: date,
    });

    // add the log array to the user object in the users array

    user.log = log;
    console.log(user);
    matchedUser = user;
  });

  res.json(matchedUser);
});

// 2- ::GET => /api/users end-point

app.get("/api/users:_id/exercises", (req, res) => {
  const userName = req.body.username;
  console.log(userName);
  res.json({ username: userName });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
