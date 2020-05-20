//

///db.contacts.explain().find({})S

// 1   ascendfing
/// -1 descending
db.contacts.createIndex({ "dob.age": 1 });
db.contacts.dropIndex({ "dob.age": 1 });

db.contacts.explain("executionStats").find({ "dob.age": { $gt: 60 } });

///indewx woek if small collection

// COMPONUND INDEX

db.contacts.createIndex({ "dob.age": 1, gender: 1 });

db.contacts.explain().find({ "dob.age": 35, gender: "male" }); ///yes
db.contacts.explain().find({ gender: "male" }); ///yes
db.contacts.explain().find({ "dob.age": 35 }); ///no cannot use index here, 50/50 distribution of males , female
///ixscan

// threshold max 32mb so index are important
db.contacts.getIndexes();
///default _id

// patial filter
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
);

//narrow down age
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { "dob.age": { $gt: 60 } } }
);
