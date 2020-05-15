//                      E X A M P L E   4

// one sity has many citizens, one citizen belongs to one city
// db holds all th major cities in the world and then a list of every person living in that city
// (registry of the state)

const db = "database"; //placeholder

// interested in fetching all the cities without getting peoples as well
// useless data to trasform and transfer: energy, time and money consuming

db.cities.insertOne({
  name: "New York City",
  coordinates: { lat: 40.7128, lon: 74.006 },
});

// getting a city back
// _id : ObjectId("5b98d4654d01c52e1637a99b")
db.cities.find({ name: "New York City" });

// creating citizen collection
db.citizen.insertMany([
  {
    firstName: "Filippo",
    lastName: "Sergenti",
    job: "student",
    cityID: ObjectId("5b98d4654d01c52e1637a99b"),
  },
  {
    firstName: "Gianfranco",
    lastName: "Ribosoio",
    job: "carbohydrate",
    cityID: ObjectId("5b98d4654d01c52e1637a99b"),
  },
]);

// query: getting all the citizens
db.citizen.find({});

// query: all citizen froma a desdered city
db.citizen.find({ cityID: ObjectId("5b98d4654d01c52e1637a99b") });
