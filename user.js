const crypto = require("crypto");

const usersArray = [];

const usersLogs = [];

// Functions

function newUser(userName) {
  // Check (by username property) if the user is exists
  // return true || false
  const userNameChecker = usersArray.some((user) => {
    return user.username === userName;
  });

  console.log(userNameChecker);

  // if the user avilable (true) - return the matched user

  if (userNameChecker) {
    // find matching user | returns the user object
    const userFinder = usersArray.find((user) => {
      // return matching user
      return user.username === userName;
    });

    // response with the matching user
    return userFinder;

    // otherwise, the user is not avilable, means create a new user
  } else {
    // create a user id - randomly generated
    const userId = crypto.randomBytes(12).toString("hex");
    // create a new user
    const newUser = { username: userName, _id: userId };

    // Push the (new user) created to the users array []
    usersArray.push(newUser);

    // return the new created user
    return newUser;
  }
}

//

function newExercise(description, duration, userIdParam, date) {
  // check for the date property existing
  if (!date || date === "") {
    // if not exists send the date of the day ( formatted in a DateString)
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

  // console.log(matchedUser);

  const userWithExerciseData = {
    username: matchedUser.username,
    _id: matchedUser._id,
    // description: description,
    duration: duration,
    date: new Date(date).toDateString(),
  };

  return { userWithExerciseData, matchedUser };
}

//----------------------=>

function exercisesLog(matchedUser, description, duration, date) {
  //ecercises count
  let excercisesCount = 0;
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

  // Push to the log array [] the matchedUser excerise data object {}

  matchedUser.log.push({
    description: description,
    duration: parseInt(duration),
    date: new Date(date).toDateString(),
  });

  console.log("After the Log Added 👇👇👇👇👇");
  // console.log(matchedUser);

  // Push to the users logs array

  // const pushToLogs = usersLogs.push(matchedUser);

  // return pushToLogs;

  usersLogs.push(matchedUser);
}

//--------------------------------=>

function userLogs(requestedUserId, from, to, limit) {
  // Matched User
  const matchedRequestedUser = usersLogs.find((user) => {
    return user._id === requestedUserId;
  });

  // case #1 => No query params => return the matchedUser
  if (!from && !to && !limit) {
    return matchedRequestedUser;
  }

  // case #2 => All query params => return the filtered matchedUserCopy

  if (from && to && limit) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Local matched user copy
    const matchedUserCopy = {
      ...matchedRequestedUser,
      log: matchedRequestedUser.log.map((log) => ({ ...log })),
    };

    //format dates
    matchedUserCopy.log.forEach((exercise) => {
      exercise.date = new Date(exercise.date);
    });

    // filter based on the from - to dates
    const filteredLogs = matchedUserCopy.log.filter((log) => {
      const logDate = log.date.getTime();
      return logDate >= fromDate.getTime() && logDate <= toDate.getTime();
    });

    const limitedLogs = filteredLogs.slice(0, parseInt(limit));

    // update matched user (Logs & Count) properties
    matchedUserCopy.log = limitedLogs;
    matchedUserCopy.count = limitedLogs.length;

    return matchedUserCopy;
  }

  // case #3 => only limit query params => return the filtered matchedUserCopy
  if (!from && !to && limit) {
    // Local matched user copy
    const matchedUserCopy = {
      ...matchedRequestedUser,
      log: matchedRequestedUser.log.map((log) => ({ ...log })),
    };

    const limitedLogs = matchedUserCopy.log.slice(0, parseInt(limit));

    // update matched user (Logs & Count) properties

    matchedUserCopy.log = limitedLogs;
    matchedUserCopy.count = limitedLogs.length;

    return matchedUserCopy;
  }
  // case #4 => from & to query params => return the filtered matchedUserCopy

  if (from && to && !limit) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Local matched user copy
    const matchedUserCopy = {
      ...matchedRequestedUser,
      log: matchedRequestedUser.log.map((log) => ({ ...log })),
    };

    // format the dates in the log property
    matchedUserCopy.log.forEach((exercise) => {
      exercise.date = new Date(exercise.date);
    });

    const filteredLogs = matchedUserCopy.log.filter((log) => {
      const logDate = log.date.getTime();
      return logDate >= fromDate.getTime() && logDate <= toDate.getTime();
    });

    // update matched user (Logs & Count) properties

    matchedUserCopy.log = filteredLogs;
    matchedUserCopy.count = filteredLogs.length;

    return matchedUserCopy;
  }
}

//functions exports

module.exports = {
  newUser,
  newExercise,
  exercisesLog,
  userLogs,
  usersArray,
};

// user.js

// function verifyUserCredentials(user) {
//   // ...
// }

// function formatUserResponse(user) {
//   // ...
// }

// function hashPassword(password) {
//   // ...
// }

// // users.js

// function createUser(userData) {
//   // ...
// }

// function getUsers(filter) {
//   // ...
// }

// export { verifyUserCredentials, formatUserResponse, hashPassword };

// you can export function or variables after creation
// but not export let / const =  in one sinlge line
// for exmaple:

/* multiple import if named export only 

    import {a ,b ,c ,d } from

    import * as anyname you choose from => but here you 
    will acces them with dot or brackets notaion 


    Alias name:

    import { realnameexported as yourNameOfChoice} from 

    */
