//                      E X A M P L E   2

// one person has a car, a cars belongs to on person
// for many OTO you will probably use EMBEDDED DOCUMENT, but not always

// let's make so that a person can only own 1 car

const db = "database"; //placeholder

db.people.insertOne({
  name: "fyll",
  age: "18",
  job: "student",
  salary: 1000,
});

// getting it back and get ID back
// _id : ObjectId("5b98d4654d01c52e1637a99b")
db.person.find({ name: "fyll" });

// we are interested in analyzing data, so we create multiple collections (analytics, application driven reason)
// if we are only interested in the cars, there is no need to fetch all the data:
// we would have to transformation to extract data && sending  loads of unnecessary data trough the wires

// creating another collection
// we get some links to work with the data (custom ID / mongo's ObjectId)
db.cars.insertOne({
  _id: "summary-fyll-1",
  model: "BWM",
  price: 40000,
  owner: ObjectId("5b98d4654d01c52e1637a99b"), // link
});

// query
let personID = db.people.find({ name: "fyll" })._id; //id stored in variable
db.cars.findOne({ _id: personID }); //getting car from desidered person
