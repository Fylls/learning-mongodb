//prettier-ignore
db.people.updateOne({/* filter */}, {$set: "new value"});

//prettier-ignore
db.people.updateMany({/* filter */}, {$set: "new value"});

// SET operator
// if filed exists          =>          just ovewrites data
// if field doesn't exist   =>          create a new field
db.people.updateMany(
  { "hobbies.title": "Sport" },
  { $set: { isSporty: true } }
);
