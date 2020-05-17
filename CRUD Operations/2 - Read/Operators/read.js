findOne; // first doc that meets criteria
find; // all docs that meet criteria

db.movies.findOne({
  /* filter */
});

// returns first element in database
// doesn't givge you back a cursor

db.movies.findOne({}); // is the same to db.movies.findOne();

db.movies.find({}); //will give back all documents in aa cursors (first 20)
