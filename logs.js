// Logs Array
const logs = [
  {
    username: "fcc_test",
    count: 1,
    _id: "5fb5853f734231456ccb3b05",
    log: [
      {
        description: "1",
        duration: 60,
        date: "Sat Jan 01 2000",
      },
      {
        description: "3",
        duration: 60,
        date: "Mon Jan 03 2000",
      },
      {
        description: "5",
        duration: 60,
        date: "Wed Jan 05 2000",
      },
      {
        description: "6",
        duration: 60,
        date: "Thu Jan 06 2000",
      },
    ],
  },
  {
    username: "number 2",
    count: 1,
    _id: "f563da49dd24c3bbe8a34bc0",
    log: [
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      },
    ],
  },
  {
    username: "number 3 the one with the Logs",
    count: 4,
    _id: "95b17b2e9cae3d1e4dcb35f8",
    log: [
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      },
      {
        description: "test",
        duration: 60,
        date: "Tue Jan 02 1990",
      },
      {
        description: "test",
        duration: 60,
        date: "Wed Jan 03 1990",
      },
      {
        description: "test",
        duration: 60,
        date: "Thu Jan 04 1990",
      },
    ],
  },
  {
    username: "number 4",
    count: 1,
    _id: "bdb795008cdfa0edfa4e7b2e",
    log: [
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      },
    ],
  },
  {
    username: "number 5",
    count: 1,
    _id: "884f8da4dacfc7924f2ea602",
    log: [
      {
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      },
    ],
  },
];

// let user = {
//   username: "fcc_test_17034154919",
//   _id: "62dadb15521aa21406ea48e1",
//   log: [
//     {
//       description: "test",
//       duration: 60,
//       date: "Mon Jan 01 1990",
//     },
//     {
//       description: "test",
//       duration: 60,
//       date: "Tue Jan 02 1990",
//     },
//     {
//       description: "test",
//       duration: 60,
//       date: "Wed Jan 03 1990",
//     },
//     {
//       description: "test",
//       duration: 60,
//       date: "Thu Jan 04 1990",
//     },
//   ],
//   count: 4,
// };

// let dates = ["1990-01-02", "1990-01-03", "1990-01-04"];

// let datesFormatted = dates.map((date) => {
//   return new Date(date);
// });
// console.log(datesFormatted);

// let logsArray = user.log;

// let limit = "3";

// console.log(logsArray.slice(0, parseInt(limit)));

// let formattedDates = logsArray.map((exercise) => {
//   return new Date(exercise.date);
// });

// let formattedDates = logsArray.forEach((exercise) => {
//   exercise.date = new Date(exercise.date);
// });

// console.log(logsArray);
// console.log(formattedDates);

// const orignalMutableObject = {
//   x: 5,
//   y: 6,
//   z: 7,
// };
// console.log("The Original:", orignalMutableObject); // => Mutable

// const copyOfTheOrignal = orignalMutableObject; // => Mutable

// console.log("The Copy:", copyOfTheOrignal);

// console.log((copyOfTheOrignal.x = copyOfTheOrignal.x + 1)); // = 6 | 6

// console.log((copyOfTheOrignal.x = copyOfTheOrignal.x + 1)); // = 6 | 7

// console.log("The Original:", orignalMutableObject); // => Mutable

// console.log("The Copy:", copyOfTheOrignal);

module.exports = logs;

/*

You are correct. In the code you provided, `copyOfTheOrignal` is not a copy of the original object. It is a new reference to the same object, `orignalMutableObject`. 

When you assign an object to a new variable using the assignment operator (`=`), you are creating a new reference to the same object in memory. Both `orignalMutableObject` and `copyOfTheOrignal` will point to the same object, so any modifications made to one will be reflected in the other.

For example:

```javascript
const orignalMutableObject = {
  x: 5,
  y: 6,
  z: 7,
};

const copyOfTheOrignal = orignalMutableObject;

copyOfTheOrignal.x = 10;

console.log(orignalMutableObject.x); // Output: 10
```

In the above code, modifying the `x` property of `copyOfTheOrignal` also changes the value of `x` in the `orignalMutableObject`, since they both reference the same object.

If you want to create an actual copy of the original object, you can use techniques such as the spread operator (`...`) or `Object.assign()`, which create a new object with the same properties and values. For example:

```javascript
const orignalMutableObject = {
  x: 5,
  y: 6,
  z: 7,
};

const copyOfTheOrignal = { ...orignalMutableObject };

copyOfTheOrignal.x = 10;

console.log(orignalMutableObject.x); // Output: 5
```

In this case, modifying the `x` property of `copyOfTheOrignal` does not affect the `x` property of the `orignalMutableObject`, as they are separate objects with their own memory references.

*/
