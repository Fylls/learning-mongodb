//                      E X A M P L E   5

// one costumer has many product (via orders), a product belongs to many customers

const db = "database"; //placeholder

// interested in fetching all the cities without getting peoples as well
// useless data to trasform and transfer: energy, time and money consuming

// THIS IS WHAT WE WOULD DO IN THE SQL WORLD

// PRODUCTS collection
db.products.insertOne({
  title: "Sotto le cuffie: Favij",
  type: "book",
  price: 12.99,
});

// getting a product back
// _id : ObjectId("5b98d4654d01c52e1637a99b")
db.products.find({ title: "Sotto le cuffie: Favij" });

// CUSTOMERS collection
db.customers.insertMany({
  name: "fyll",
  age: 18,
});

// getting a costumer back
// _id : ObjectId("b732mv4fw8nptvs54nw5i7tk")
db.products.find({ title: "Sotto le cuffie: Favij" });

// ORDERS collection
db.orders.insertMany({
  productID: ObjectId("5b98d4654d01c52e1637a99b"),
  customerID: ObjectId("b732mv4fw8nptvs54nw5i7tk"),
});

// query: getting the precise order
// in SQL it would be called "JOIN"
const yourProductID = db.citizen.find({ title: "Sotto le cuffie: Favij" })._id;
const yourCustomerID = db.citizen.find({ name: "fyll" })._id;
db.orders.find({ productID: yourProductID, customerID: yourCustomerID });

/*=======================================================================================*/

// working with only 2 tables
// reference driven approach

//  PRODUCTS collection
db.products.insertOne({
  title: "Sotto le cuffie: Favij",
  type: "book",
  price: 12.99,
});

// getting a product back
// _id : ObjectId("5b98d4654d01c52e1637a99b")
db.products.find({ title: "Sotto le cuffie: Favij" });

// CUSTOMERS collection
db.customers.insertMany({
  name: "fyll",
  age: 18,
  orders: [{ productID: ObjectId("5b98d4654d01c52e1637a99b"), quantity: 300 }],
});
