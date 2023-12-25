const matchUser = {
  username: "fcc_test_17034154919",
  _id: "62dadb15521aa21406ea48e1",
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
  count: 4,
};

// shallow copy with deep copy for the log array

const matchUserCopy = {
  ...matchUser,
  log: matchUser.log.map((log) => ({ ...log })),
};

console.log(matchUserCopy);

const modifierArray = ["LoL, Modified Bro ... try agian"];

matchUserCopy.log = modifierArray;

console.log("The copy after first modifiy ::", matchUserCopy);

console.log("The orignal after the copy modified ::", matchUser); //orignal after #1

matchUserCopy.log = "number 2 modifiy, fresh or presist";

console.log("The copy after second modifiy ::", matchUserCopy); // copy #2

console.log("The orignal after the 2nd copy modified ::", matchUser); //orignal after #1
