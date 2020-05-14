//  U N D E R S T A N D I N G   R E L A T I O N S

//  if
//      strongly related to costumer &&
//      you want to fetch both at the same time in an easy way
//  => embedded

//  EXAMPLE:  customers, each customer has list of his fab books (embedded style)

exaple = { userName: "fyll", favBooks: ["{...}, {...}, {...}, {...}"] };

// loads of duplicates && if you want to change you have to change SAME data for all costumers
// different people can choose different products (ManyToMany)

// here REFERENCES are better, customer and book collection:
// in db.costumer I will only store ids of fav books,
// in db.books I will store all data about all the individual books.

// when fetch books i will have 2 queries, BUT
// if I want to change data about a precise book you only have to do it 1 time in a specific doc.
