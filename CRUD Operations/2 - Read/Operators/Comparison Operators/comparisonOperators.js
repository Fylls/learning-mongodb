//               O P E R A T O R S

/*

$eq:        equal to
$ne:        not equal to

$lt:        lower than
$lte:       lower or equal than

$gt         greater than
$gte        greater or requal to

$in:  []    all values in array EQUAL TO
$nin: []    all values in array NOT EQUAL TO


*/

//              TOP LEVEL DOCUMENTS

// searches docs with runtime EQUAL to 60
db.movies.find({ runtime: { $eq: 60 } }); // is the same to
db.movies.find({ runtime: 60 });

// searches docs with runtime NOT EQUAL to 60
db.movies.find({ runtime: { $ne: 60 } });

// searches docs with runtime LOWER THEN 60
db.movies.find({ runtime: { $lt: 60 } });

// searches docs with runtime LOWER THEN 60
db.movies.find({ runtime: { $lt: 60 } });

//                EMBEDDED FIELDS

db.movies.find({ "ratings.average": { $gte: 7 } });

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
