db.frgrpiends.aggregate([
  {
    $project: {
      _id: 0,
      numScores: { $size: "$exameScores" },
    },
  },

  //array to put our elementsS
  // flatens the array by repeteting
  { $unwind: "$hobbies" }, //separtate obj
  {
    $group: {
      _id: { age: "$age" },
      allHobbies: { id: 0, $push: "$hobbies" },
    },
  },
]);

//filter
db.frgrpiends.aggregate([
  {
    $project: {
      _id: 0,
      exameScores: {
        $filter: {
          input: "$examScores",
          as: "sc",
          cond: { $gt: ["$$sc.score", 60] },
        },
      },
    },
  },
]);

// array

db.frgrpiends.aggregate([
  { $unwind: "$examScores" },
  { $project: { _id: 1, nameL1, age: 1, score: "$examsScores.score" } },
  { $sort: { score: -1 } },
  { $group: { _id: "$_id", name: {}, maxScore: { $ma: "$score" } } },
  { $sort: { $maxScore: -1 } },
]);

///bucket stage

db.frgrpiends.aggregate([
  {
    //bucket => categories
    $bucket: {
      groupNy: "$dob.age",
      boundaries: [0, 18, 30, 50, 80, 120],
      output: {
        verageAge: { $avg: "$dob.age" },
        numPersons: { $sum: 1 },
        //names: { $push: "name.first" },
      },
    },
  },
]);

//or
db.frgrpiends.aggregate([
  {
    $bucketAuto: {
      groupNy: "$dob.age",
      buckets: 5,
      boundaries: [0, 18, 30, 50, 80, 120],
      output: {
        verageAge: { $avg: "$dob.age" },
        numPersons: { $sum: 1 },
      },
    },
  },
]);

// top 10 oldest male persons in database
db.persons.aggregate([
  //1
  { $match: { gender: "male" } },
  //2
  {
    $project: {
      _id: 0,
      name: { $concat: ["$name.first", " ", "$name.last"] },
      birthdate: { toDate: "$dob.date" },
    },
  },
  //3
  { $sort: { birthdate: 1 } },
  //4
  { $skip: 10 },
  //5
  { $limit: 10 },
]);

// ORDER is important
// pipeline is processed step by step
// sort => skip => limit

//you just use right order to maximize performances
