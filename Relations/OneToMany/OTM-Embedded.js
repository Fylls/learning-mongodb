//                      E X A M P L E   3

// one thread has many answers, one answer belongs to one question thread.
// Q&A section w// question thread

const db = "database"; //placeholder

db.questionThread.insertOne({
  name: "fyll",
  question: "how does that all work?",
  answers: ["q1a1", "q1a2"], //IDs
});

// getting it back
db.person.find({ name: "fyll" });

// creating answers collection
db.answers.insertMany([
  {
    _id: "q1a1",
    text: "it works like that.",
  },
  {
    _id: "q1a2",
    text: "thanks",
  },
]);

// query: getting all the answers
db.answers.find({});

/*=======================================================================================*/

// not the best way, question will mostly be loaded with its answers, so EMBEDDED is better

db.questionThread.insertOne({
  name: "fyll",
  question: "how does that all work?",
  answers: [
    { name: "gianroberto erbacotta", text: "like that" },
    { name: "roborbio", text: "i don't know" },
    {
      name: "Andrea Sperelli-Fieschi d'Ugenta",
      text: "Bisogna fare la propria vita come si fa un’opera d’arte...",
    },
    {
      name: "Ser Ciappelletto",
      text: "Ohimè messere, parete uom di Dio: come dite voi coteste parole?",
    },
  ],
});

// query: getting all the answers
db.questionThread.findOne({
  name: "fyll",
  question: "how does that all work?",
});
