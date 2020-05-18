// general structure

db.movies.find(
  {}, //all
  {
    /* projection */
  }
);

db.movies.find({}, { name: 1, runtime: 1, genres: 1 }).pretty();

// 0 is not excluded
// 1 is included

// id always included, need to specify
const example = { _id: 0 };

// projection in arrays
db.movies.find({ genres: "Drama" }, { "genres.$": 1 }).pretty();

db.movies
  .find(
    { genres: { $all: ["Drama", "Thriller", "Horror"] } },
    { "genres.$": 1 }
  )
  .pretty();

// totally unrelated
db.movies.array.find(
  { genres: "Drama" },
  { genres: { $elemMatch: { $eq: "Horror" } } }
);

// SLICE: operator
//getting only the first 2 elements of array
db.movies.array.find(
  { "rating.average": { $gt: 9 } },
  { genres: { $slice: 2 }, name: 1 }
);

//or

db.movies.array.find(
  { "rating.average": { $gt: 9 } },
  { genres: { $slice: [1, 2] }, name: 1 }
);

//  [    elemets you skip,   elements you want   ]
