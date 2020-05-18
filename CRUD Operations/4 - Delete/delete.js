//   Delete

// filter or query selector
db.delateOne(/* filter */);
db.delateOne({ name: "Chris" });

db.delateMany(/* filter */);
db.delateMany({ age: { $gt: 30 }, isSporty: true });
db.delateMany({ age: { $exists: false }, isSporty: true });

// deleting an entire collection
// ( all entries )

db.movies.delateMany({});
// or
db.movies.drop();

// deleting entire database
db.dropDarabase();
