const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const {
  newUser,
  newExercise,
  exercisesLog,
  userLogs,
  usersArray,
} = require("./user");

const importedlogs = require("./logs");

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const users = [];

users.push({ username: "fcc_test", _id: "5fb5853f734231456ccb3b05" });

// let log = [];

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
  // log.push(objectToPush);

  const count = exercisesCount;

  exercisesCount++;

  user.count = count;

  // return (user.log = log);
});

// ::
//  ==>--------First route end-points----------<==
// ::

// 1- ::POST => /api/users end-point

app.post("/api/users", (req, res) => {
  // username
  userName = req.body.username;

  const newCreatedUser = newUser(userName);

  res.json(newCreatedUser);
});

// 2- ::GET => /api/users end-point

app.get("/api/users", (req, res) => {
  res.json(usersArray);

  console.log("Users Array from GET req to /api/users 👇");
  // console.log(usersArray);
});

// ::
//  ==>--------Second route end-points----------<==
// ::

// 1- ::POST => /api/users end-point

app.post("/api/users/:_id/exercises", (req, res) => {
  // convert exercise description to string before use it in the response
  const description = String(req.body.description);

  // convert exercise duration to intger before use it in the response
  const duration = parseInt(req.body.duration);

  // exercise (user id)
  const userIdParam = req.params._id;

  // request exercise date
  let date = req.body.date;

  const exceriseDate = newExercise(description, duration, userIdParam, date);

  const matchedUser = exceriseDate.matchedUser;
  const userWithExerciseData = exceriseDate.userWithExerciseData;

  res.json(userWithExerciseData);

  exercisesLog(matchedUser, description, duration, date);

  console.log("Returned Res for the matched user");

  console.log("The Log Array from POST Req :: after push user-excer-data 👇");

  console.log("The usersLogs Array from POST Req :: 👇");
  // console.log(usersLogs);
  console.log(`--------------End of usersLogs in /logs-----------`);
});

// ::
//  ==>--------Third route end-points----------<==
// ::

// 1- ::GET => /api/users end-point

app.get("/api/users/:_id/logs", (req, res) => {
  // id param
  const requestedUserId = req.params._id;
  //qyery params {from - to - limit}
  const { from, to, limit } = req.query;

  const getlogs = userLogs(requestedUserId, from, to, limit);

  res.json(getlogs);

  // console.log(requestedUserId);
  // console.log({ from: from, to: to, limit: limit });
});

// :: ->> Logic functions are in "./user.js"

// Server listens on port 3000

const listener = app.listen(process.env.PORT || 8800, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
