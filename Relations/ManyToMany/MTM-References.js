//                      E X A M P L E   6

// one book has many authors, an author belongs to many books

const db = "database"; //placeholder

// BOOKS collection
db.books.insertMany([
  {
    title: "Hypnerotomachia Poliphili",
    language: "latin",
    publicationDate: 1499,
    authors: [{ name: "Francesco Colonna" }, { name: "fyll" }],
  },
  {
    title: "Paralipomeni della Batracomiomachia",
    language: "italian",
    publicationDate: 1842,
    authors: [{ name: "Giacomo Leopardi" }, { name: "fyll" }],
  },
]);

// getting a product back
// _id : ObjectId("5b98d4654d01c52e1637a99b")
db.products.find({ publicationDate: 1499 });

// AUTHORS collection
db.authors.insertMany([
  {
    name: "fyll",
    age: 18,
    dateOfBirth: 2002,
    nationality: " italian",
  },
  {
    name: "Francesco Colonna",
    age: 587,
    dateOfBirth: 1433,
    nationality: " italian",
  },
  {
    name: "Giacomo Leopardi",
    dateOfBirth: 1798,
    age: 222,
    nationality: " italian",
  },
]);

/*=======================================================================================*/

// if author changes its name because he gets married, OR changes its age since he gets older:
// we need to update that data across all other books

// great database: if data changes it should change anywhere
// high frequency of updates => reference

///ObjectId("5b98d4654d01c52e1637a99b"),
//customerID: ObjectId("b732mv4fw8nptvs54nw5i7tk"),

// BOOKS collection
db.books.insertMany([
  {
    title: "Hypnerotomachia Poliphili",
    language: "latin",
    publicationDate: 1499,
    authors: [
      ObjectId("5b98d4654d01c52e1637a99b"),
      ObjectId("b732mv4fw8nptvs54nw5i7tk"),
    ],
  },
  {
    title: "Paralipomeni della Batracomiomachia",
    language: "italian",
    publicationDate: 1842,
    authors: [
      ObjectId("n3ryng4t3mmvx9k09445n38a"),
      ObjectId("b732mv4fw8nptvs54nw5i7tk"),
    ],
  },
]);

// AUTHORS collection
db.authors.insertMany([
  {
    //ObjectId("b732mv4fw8nptvs54nw5i7tk")
    name: "fyll",
    age: 18,
    dateOfBirth: 2002,
    nationality: " italian",
  },
  {
    //ObjectId("5b98d4654d01c52e1637a99b"),
    name: "Francesco Colonna",
    age: 587,
    dateOfBirth: 1433,
    nationality: " italian",
  },
  {
    //ObjectId("n3ryng4t3mmvx9k09445n38a")
    name: "Giacomo Leopardi",
    dateOfBirth: 1798,
    age: 222,
    nationality: " italian",
  },
]);
