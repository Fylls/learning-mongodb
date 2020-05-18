//               O P E R A T O R S

/*
    $in:

    $size: 
     
    $all:       

    $elemMatch:        
*/

//                  A R R A Y S

// here genres is not equal to drama, IT JUST CONTAINS IT
// drama may exist in the array but it is not the only one
db.movies.find({ genres: "Drama" });

// exact equality
// just drama, no other data
db.movies.find({ genres: ["Drama"] });

// IN: operator
// checking for more than one value
// specifying in array all values accepted in key
db.movies.find({ runtime: { $in: [30, 42, 54, 66] } });

// finding values in array of documents
db.users.find({ "hobbies.title": "Sport" });

// SIZE: operator
// finding all users how have 3 hobbies
db.users.find({ hobbies: { $size: 3 } });

// finding all movies WITH THIS PRECISE ORDER
db.movies.find({ genre: ["action", "thriller"] });

// ALL: operator
// if you don't care about order, just all field included
db.movies.find({ genre: { $all: ["action", "thriller"] } });

// ELEMMATCH: operator
// condition just checking a desidered field
db.movies.find({
  $and: [{ "hobbies.title": "Sports" }, { "hobbies.frequancy": { $gte: 2 } }],
});
