//               O P E R A T O R S

/*

$or:        returns either condition 1 or condition 2 , conditionN... are satisfied individally
$nor:       //

$and:       return if all conditions are satisfied at once

$eq:        equal to
$ne         not equal to
$not:       turns around logic 

$gt        
$gte       


*/

// HOW MANY items found?
db.movies.find(/* filters */).count();

///////////////////////////////////////////////////////////////////

//              $ O R   $ N O R   O P E R A T O R S

// finding all docs where rating EITHER lower than 5 OR greater than 9
// condition 1 satisfied + condition 2 satisfied - both condition 1 and 2 satisfied at once

//prettier-ignore
db.movies.find({$or: [{/* condition 1 */}, {/*  condition 2 */}]});

db.movies.find({
  $or: [
    {
      /* condition 1 */
    },
    {
      /* condition 2 */
    },
  ],
});

// example, $nor works the same way but inverts the logic
db.movies.find({
  $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9 } }],
});

// nor + or always equal to whole
const allDocuments = 240;

const orCount = db.movies
  .find({
    $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9 } }],
  })
  .count(); // 4

const norCount = db.movies
  .find({
    $nor: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9 } }],
  })
  .count(); // 236

// 240 = 4 + 236
allDocuments = orCount + norCount;

///////////////////////////////////////////////////////////////////////////////

//              $ A N D  O P E R A T O R

// having both conditions satisfied at once

// old syntax
db.movies.find({
  $and: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9 } }],
});

// newer syntax ( using just a comma )
db.movies.find({
  "rating.average": { $lt: 5 }, // first condition
  generes: "Drama", // second condition
});

// if multiple condition on same filed we will use $and

// this will not work in all drivers
// in JS having same name in one obj is not permitted
// here "Horror" it will be overwritten by "Drama"
db.movies.find({
  generes: "Horror", // first condition
  generes: "Drama", // second condition
});

// this will now work
db.movies.find({
  $and: [{ generes: "Horror" }, { generes: "Drama" }],
});

//////////////////////////////////////////////////////////////////////////

//              $ N O T   O P E R A T O R

// returns if value is different
db.movies.find({ runtime: { $not: { $eq: 60 } } });

// it is the same as writing
db.movies.find({ runtime: { $ne: 60 } });
