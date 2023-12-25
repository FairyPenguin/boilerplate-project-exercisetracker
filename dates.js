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

const fromDate = new Date("1990-01-01");
const toDate = new Date("1990-01-04");

console.log(fromDate, toDate);

matchUserCopy.log.forEach((log) => {
  log.date = new Date(log.date);
});

console.log(matchUserCopy);
// console.log(matchUser);

const filteredLogs = matchUserCopy.log.filter((log) => {
  const logDate = log.date.getTime();
  return logDate >= fromDate.getTime() && logDate <= toDate.getTime();
});

console.log(filteredLogs);

// matchUserCopy.log = filteredLogs;
