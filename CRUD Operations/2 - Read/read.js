findOne; // first doc that meets criteria
find; // all docs that meet criteria

db.movies.findOne({
  /* filter */
});

// returns first element in database
// doesn't givge you back a cursor

db.movies.findOne({}); // is the same to db.movies.findOne();

db.movies.find({}); //will give back all documents in aa cursors (first 20)

/////////////////////////////////////////////////////

// SUMMARY:

// find all movies where visitors exceeded expectedVisitors
db.movies.find({ $expr: { $gt: ["$visitors", "$expectedVisitors"] } }).pretty();

// find all movies with exactly 2 genres
db.movies.find({ genre: { $size: 2 } }).pretty();

// fild all movies aided in 2018
db.movies.find({ "meta.aired": { $eq: 2018 } }).pretty();

// find all movies which have ratings graater than 8 but lower than 10
db.movies
  .find({
    $and: [
      { $expr: { $gt: ["$ratings", 8] } },
      { $expr: { $lt: ["$ratings", 10] } },
    ],
  })
  .pretty();

// find all movies that have a rating higher than 9.2 and runtime lower than 100 minutes
db.movies
  .find({
    $and: [{ "rating.average": { $gt: 9.2 } }, { runtime: { $lt: 100 } }],
  })
  .pretty();

// find all movies that have a genre of "drama" or "action"
db.movies
  .find({
    $or: [{ genres: "Drama" }, { genres: "Action" }],
  })
  .pretty();
