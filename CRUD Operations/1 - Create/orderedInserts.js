//                  O R D E R E D   I N S E R T

// every element you insert, is processed stand alone,
// but if one fails, it cancels the entire insert operation
// but it does not rollback the elements it already inserted,

/// !!! it cancels the operation and does not continue with the next document !!!

// IDs are ALWAYS requires
// if no rtepetitions, name === id

db.hobbies.insertMany([
  { _id: "sports", name: "sports" },
  { _id: "yoga", name: "yoga" },
  { _id: "cooking", name: "cooking" },
  { _id: "cars", name: "cars" },
]);

// if you will write the same hobbie twice, since they have the same ID mongo will give you an error
// DUPLICATE KEY ERROR COLLECTION

// all new documents will be added except the duplicate
db.hobbies.insertMany([
  { _id: "sports", name: "sports" }, // this will be added
  { _id: "coding", name: "coding" }, // this will not be added
]);

// configs => order: "false"
// if something fails, it continues anyway (continuing after failing on "sports")
db.hobbies.insertMany(
  [
    { _id: "sports", name: "sports" }, // this will be added
    { _id: "coding", name: "coding" }, // this will not be added
  ],
  { order: "false" } ///true is default setting
);
