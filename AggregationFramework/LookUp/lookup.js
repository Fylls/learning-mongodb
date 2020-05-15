//i want to fetch my books with authors included
const db = "database"; //placeholder

// from:            from which other collection?
// localField:      where can the reference to the other collection be founded? (internal: books )
// foreignField:    which fields are you relating to in your target collection  (external: authors )
// as:              alias under which the document is going to be merged

db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      localField: "authors",
      foreignField: "_id",
      as: "creators",
    },
  },
]);

// new data under the CREATORS field
const previous = {
  title: "Paralipomeni della Batracomiomachia",
  language: "italian",
  publicationDate: 1842,
  autors: [
    ObjectId("b732mv4fw8nptvs54nw5i7tk"),
    ObjectId("5b98d4654d01c52e1637a99b"),
  ],
  creators: [
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
  ],
};

// having collections still separated but merged in 1 step
