const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const crypto = require("crypto");
const { truncate } = require("fs");

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

// console.log(users[0]);

// const a = { description: "a object", duration: 60, date: "" };

// if (!a.date || a.date === "") {
//   a.date = new Date().toDateString();
//   console.log(a);
// }

// Users Array
console.log("users Array 👇👇");
const usersArray = [];
console.log(usersArray);
console.log("users Array ---------End--------");

// UsersLogs Array

const usersLogs = [];

// ::
//  ==>--------First route end-points----------<==
// ::

// 1- ::POST => /api/users end-point

app.post("/api/users", (req, res) => {
  // username
  const userName = req.body.username;
  //user id - randomly generated
  const userId = crypto.randomBytes(12).toString("hex");

  // Check (by username property) if the user is user exists
  // return true || false
  const userNameChecker = usersArray.some((user) => {
    return user.username === userName;
  });

  console.log(userNameChecker);

  if (userNameChecker) {
    // find matching user
    const userFinder = usersArray.find((user) => {
      return user.username === userName;
      // return matching user
    });

    // response with the matching user
    res.json(userFinder);
  } else {
    // create new user
    const newUser = { username: userName, _id: userId };

    // Push the new created user to the users array []
    usersArray.push(newUser);

    // response with the new created user
    res.json(newUser);
  }
});

// 2- ::GET => /api/users end-point

app.get("/api/users", (req, res) => {
  res.json(usersArray);

  console.log("Users Array from GET req to /api/users 👇");
  console.log(usersArray);
  console.log(`-------------------------
               -------------------------
  `);
});

// ::
//  ==>--------Second route end-points----------<==
// ::

// 1- ::POST => /api/users end-point

app.post("/api/users/:_id/exercises", (req, res) => {
  //excersices log array
  //ecercises count
  // let excercisesCount = 0;
  // mathced user

  const description = req.body.description;
  const duration = req.body.duration;
  let date = new Date(req.body.date).toDateString();
  const userIdParam = req.params._id;
  console.log(userIdParam);
  if (!date || date === "") {
    date = new Date().toDateString();
  }

  /* 
  match the user id from the excercise data to the user
  id in the users array
    */
  let matchedUser = usersArray.find((user) => {
    return user._id === userIdParam;
  });

  // console.log("The matched user with id :: 👇");

  console.log(matchedUser);

  res.json({
    username: matchedUser.username,
    _id: matchedUser._id,
    description: description,
    duration: parseInt(duration),
    date: date,
  });

  console.log("Returned Res for the matched user");
  console.log({
    username: matchedUser.username,
    _id: matchedUser._id,
    description: description,
    duration: parseInt(duration),
    date: date,
  });

  console.log(usersArray);

  // let matchedUserId = usersArray.find((user) => {
  //   return user._id === userIdParam;
  // });

  // console.log(matchedUserId);

  // pusth the exercise data to the log array

  // let userExerciseData = {
  //   description: String(description),
  //   duration: parseInt(duration),
  //   date: date,
  // };

  // log.push(userExerciseData);

  console.log("The Log Array from POST Req :: after push user-excer-data 👇");

  // excercisesCount++;

  /* 
    push to the main usersLogs Array [] 
    1- log array[description,duration,date] +
    2- count +
    3- user object {username,_id} 
    */
  // usersLogs.push({ ...user, log });

  // user = {
  //   ...user,
  //   description: String(description),
  //   duration: parseInt(duration),
  //   date: date,
  // };

  console.log("The usersLogs Array from POST Req :: 👇");

  console.log(usersLogs);
  console.log(`-------------------------
    -------------------------
`);
  // console.log(usersLogs[0]);

  // add the log array to the user object in the users array

  // user.log = log;
  // console.log(user);

  // console.log(matchedUser);
});

// 2- ::GET => /api/users end-point

// ::
//  ==>--------Third route end-points----------<==
// ::

// 1- ::GET => /api/users end-point

app.get("/api/users/:_id/logs", (req, res) => {
  const requestedUserId = req.params._id;

  //   matchedUser = usersLogs.find((user) => {
  //     return user._id === requestedUserId;

  //     console.log("The Matched User from the GET Req :: 👇");
  //     console.log(matchedUser);
  //     console.log(`-------------------------
  //     -------------------------
  // `);
  //   });

  // res.json(matchedUser);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
