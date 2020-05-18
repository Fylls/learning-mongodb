//it

db.movies.find().count(); // pointer lenght, how many elements?

db.movies.find().next(); //same as "it" for in applications

const dataCursor = db.movies.find();

dataCursor.next();

/////////////////////////////////////////

// it is better to filter from the berver side and not the client'side
dataCursor.forEach((doc) => {
  printjson(doc);
});

// know if cursor has finished execution
db.movies.find().hasNext();

// sorting
// a ascending
// 0 discending
db.movies.find().sort({ "rating.average": -1 });
