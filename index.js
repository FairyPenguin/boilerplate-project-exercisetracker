const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const crypto = require("crypto");

const logs = require("./logs");
const { log } = require("console");

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
console.log("usersLogs Array 👇👇");
const usersLogs = [];
console.log(usersLogs);
console.log("users Logs ---------End--------");

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
  let excercisesCount = 0;
  // mathced user

  const description = String(req.body.description);
  const duration = parseInt(req.body.duration);
  let date = req.body.date;
  const userIdParam = req.params._id;
  console.log(userIdParam);

  // check for the date property existing
  if (!date || date === "") {
    // if not exists send the date of the day formatted to DateString
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
    duration: duration,
    date: new Date(date).toDateString(),
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

  // :: Check for the log property exsits in the matcherUser object

  if (!matchedUser.log) {
    // if not exists => create the log property = []
    matchedUser.log = [];
  }

  // :: Check for the count property exsits in the matcherUser object

  if (!matchedUser.count) {
    // if not exists => create the count property = number
    matchedUser.count = parseInt(excercisesCount);
  }

  // incremnet the excercises count property
  matchedUser.count++;

  // Push to the log array [] the matchedUser excerise data object = {}

  matchedUser.log.push({
    // username: matchedUser.username,
    // _id: matchedUser._id,
    description: description,
    duration: parseInt(duration),
    date: new Date(date).toDateString(),
  });

  console.log("After the Log Added 👇👇👇👇👇");
  console.log(matchedUser);

  // Push to the users logs array

  usersLogs.push(matchedUser);

  console.log("The Log Array from POST Req :: after push user-excer-data 👇");

  console.log("The usersLogs Array from POST Req :: 👇");
  console.log(usersLogs);
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

  log(from, to, limit);

  matchedRequestedUser = usersLogs.find((user) => {
    return user._id === requestedUserId;
  });

  // const From = "Mon Jan 01 1990";
  // const To = "Tue Jun 06 2006";
  // const Limit = 3;

  // const From = undefined;
  // const To = undefined;
  // const Limit = undefined;

  if (!from && !to && !limit) {
    res.json(matchedRequestedUser);
  }

  if (from && to && limit) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    let userLogs = matchedRequestedUser.log;
    console.log("THE USER LOGS");
    console.log(userLogs);

    let filteredLogs = userLogs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= fromDate && logDate <= toDate;
    });

    const limitedLogs = filteredLogs.slice(0, parseInt(limit));

    matchedRequestedUser.log = limitedLogs;
    // console.log("limitedLogs *****");
    // console.log(limitedLogs);

    res.json(matchedRequestedUser);
  }

  if (!from && !to && limit) {
    let userLogs = matchedRequestedUser.log;

    console.log("THE USER LOGS");
    console.log(userLogs);

    const limitedLogs = userLogs.slice(0, parseInt(limit));

    // console.log("limitedLogs *****");
    // console.log(limitedLogs);

    matchedRequestedUser.log = limitedLogs;

    res.json(matchedRequestedUser);
  }

  if (from && to && !limit) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    let userLogs = matchedRequestedUser.log;
    console.log("THE USER LOGS");
    console.log(userLogs);

    let filteredLogs = userLogs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= fromDate && logDate <= toDate;
    });

    matchedRequestedUser.log = filteredLogs;

    res.json(matchedRequestedUser);
  }

  // if (from && to && limit) {
  //   const fromDate = new Date(from).toDateString();
  //   const toDate = new Date(to).toDateString();

  //   let userLogs = matchedRequestedUser.log;
  //   console.log("THE USER LOGS");
  //   console.log(userLogs);

  //   let filteredLogs = userLogs.filter((log) => {
  //     const logDate = log.date;
  //     return logDate >= fromDate && logDate <= toDate;
  //   });

  //   const limitedLogs = filteredLogs.slice(0, parseInt(limit));

  //   console.log("limitedLogs *****");
  //   console.log(limitedLogs);

  //   res.json(limitedLogs);
  // } else {
  //   res.json(matchedRequestedUser);
  // }

  // res.json({
  //   requestedUserId: requestedUserId,
  //   from: from,
  //   to: to,
  //   limit: limit,
  //   // logs: userLogs,
  // });

  console.log("The Matched User from the GET Req :: 👇");
  // console.log(matchedRequestedUsermatchedRequestedUser);
  // res.json(matchedRequestedUser);
  console.log("-----------End-----------");
});

// :: ->> Logic functions

// Server listens on port 3000

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
