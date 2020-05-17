//               O P E R A T O R S

/*
    $regex:        esearch for text
    $expr:         want to compare 2 field in a db
*/

// exactly equal
db.movies.find({ summary: "musical" });

// finding text snippets (using regex)
// not the most efficient one: text indexes are better
db.movies.find({ summary: { $regex: /musical/ } });

// use finalcialData        (as database)
db.sales.insertMany([
  { volume: 100, tagert: 120 },
  { volume: 89, tagert: 80 },
  { volume: 200, tagert: 177 },
  { volume: 69, tagert: 96 },
]);

// find all ementents in collection where "volume" is greater than  "target"

// need to put fields in "$field"
db.sales.find({ $expr: { $gt: ["$volume", "$target"] } });

// if "volume" is above 190 the difference to "target" must be at least 10.
db.sales.find({
  $expr: {
    $gt: [// find all ementents in collection where first is greater than second
      {// first argument
        $cond: {
          if: { $gte: ["$volume", 190] },
          then: { $subtract: ["$volume", 10] },
          else: "$volume",
        },
      },
      {// first argument
        "$target"
      },
    ],
  },
});
