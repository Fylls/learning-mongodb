//index in small collection you gonna look up often

///db.contacts.explain().find({})S

//  1 ascendfing
// -1 descending
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

//unique, data concistency
db.contacts.createIndex({ email: 1 }, { unique: true });

// pPARTIAL INDEX
// partial is ricky, when not requiered, collection scan
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: "male" } }
);

//narrow down age
db.contacts.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { "dob.age": { $gt: 60 } } }
);

db.contacts.createIndex(
  { "dob.age": 1 },
  { unique: true, partialFilterExpression: { gender: { $exists: true } } }
);

// partial = index size smaller, only age of males, low impact on HDD, great speed

//TIME TO LIVE INDEX TTL

db.sessions.insertOne({ data: "dsjfh", createdAt: new Date() }); //ISO Date

// destroys themself after some timestamp
db.sessions.createIndex({ createAt: 1 }, { expireAfterSeconds: 10 });

// covered queries
// query full covered by index
// max efficiency
db.costumers
  .explain("executionStats")
  .find({ name: "Max" }, { _id: 0, name: 1 });

// conpound index
// order does not matter
db.contacts.createIndex({ age: 1 }, { name: 1 });

// multi-key
db.contacts.insertOne({
  name: "Max",
  hobbies: ["Cooking", "Sports"],
  addresses: [{ street: "Main Street" }],
});

db.contacts.createIndex({ hobbies: 1 });

// TEXT INDEX

// better than regulart expressions
// item in keywords
db.products.createIndex({ description: "text" });
db.products.find({ $text: { $search: "awesome" } }); //case insensitive - everything is stored lovercase

//treated as 2 different key words
db.products.find({ $text: { $search: "awesome book" } });

//search for a specific phrase
db.products.find({ $text: { $search: '"awesome book"' } });

// score,  better match
db.products.find(
  { $text: { $search: "awesome book" } },
  { score: { $meta: "textScore" } }
);

// sorting by score
db.products
  .find(
    { $text: { $search: "awesome book" } },
    { score: { $meta: "textScore" } }
  )
  .sort({ score: { $meta: "textScore" } });

// you can only have 1 text index per collection
db.contacts.createIndex({ title: "text" }); // error
// no such thing as text index
db.contacts.dropIndex({ title: "text" }); //error

// text index drop
db.contacts.dropIndex("description_text");

// combined text index
// serching both in title and descrupotion with same index
db.contacts.createIndex({ title: "text", description: "text" }); // error

// word blacklist (exclude)
// -word
db.products.find({ $text: { $search: "red -book" } });

db.productd.getIndexes();

// language and weights
db.contacts.createIndex(
  { title: "text", descfription: "text" },
  // config obj
  {
    default_lang: "italian",
    background: true,
    weights: { title: 1, description: 10 },
  }
);

db.product.find(
  {
    $text: { $search: "sas", $language: "italian", caseSensitivity: true },
  },
  { score: { $meta: "textScore" } }
);
