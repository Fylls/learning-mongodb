db.movies.findOne({
  /* filter */
});

//prettier-ignore
db.movies.findOne({});
/* is the same to */ db.movies.findOne();
// returns first element in database
// doesn't givge you back a cursor
