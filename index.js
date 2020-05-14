const db = "lol";

/*
MongoDB Enterprise              show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
shop    0.000GB
test    0.000GB

MongoDB Enterprise >            use hospital
switched to db hospital
*/

db.patients.insertOne({ name: "fiiippo", age: 18, dSummary: "summary-1" });

db.dSummary.insertOne({
  _id: "summary-1",
  diseases: ["cold", "si e` rotto il cazzo", "odia la scuola"],
});

var dsid = db.patients.findOne().dSummary;

db.dSummary.findPne({ _id: dsid });

/*
db.dSummary.findOne({_id: dsid})

        "_id" : "summary-1",
        "diseases" : [
                "cold",
                "si e` rotto il cazzo",
                "odia la scuola"
        ]
}
*/
////////////////////

//one to many

db.city.insertOne({ name: "new york", lat: 10, lon: 55 });

db.city.findOne({}); //ObjectId("5b47d9f8b03kn459s99ss")

db.citizen.insertOne({
  name: "filippo",
  cityId: ObjectId("5b47d9f8b03kn459s99ss"),
});

var city = db.patients.findOne().dSummary;

db.dSummary.findPne({ _id: dsid });

// many to many
