//                      E X A M P L E   1

// one patient has one disease summary, a disease summary belongs to one patient
// OTO relation, summary for patience A cannot be never belong to patient B

const db = "database"; //placeholder

db.patients.insertOne({
  name: "fyll",
  age: 30,
  diseaseSummary: "summary-fyll-1",
});

db.patients.find({ name: "fyll" }); //getting it back

///creating another collection
db.diseaseSummary.insertOne({
  _id: "summary-fyll-1",
  diseases: ["cold", "broken leg"],
});

// query
let dsID = db.patients.find({ name: "fyll" }).diseaseSummary; //id stored in variable
db.diseaseSummary.findOne({ _id: dsID }); //getting diseases fro desidered patient

///////////////////////////////////////////////////////////////////////////////////////

// if big database, it is not the best way to handle it.
// unnecessary:
// STRONG ONE TO ONE RELATINSHIP => embedded documents

db.patients.insertOne({
  name: "fyll",
  age: 30,
  diseaseSummary: { diseases: ["cold", "broken leg"] },
});

//query for everyinfos
const allInfos = db.patients.find({ name: "fyll" });

//query for diseases
const fyllDiseases = db.patients.find({ name: "fyll" }).diseaseSummary.diseases;
