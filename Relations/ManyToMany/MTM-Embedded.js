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
db.customers.insertOne({
  name: "fyll",
  age: 18,
});

// getting a costumer back
// _id : ObjectId("b732mv4fw8nptvs54nw5i7tk")
db.products.find({ title: "Sotto le cuffie: Favij" });

// ORDERS collection
db.orders.insertOne({
  productID: ObjectId("5b98d4654d01c52e1637a99b"),
  customerID: ObjectId("b732mv4fw8nptvs54nw5i7tk"),
});

// query: getting the precise order
// in SQL it would be called "JOIN"
const yourProductID = db.citizen.find({ title: "Sotto le cuffie: Favij" })._id;
const yourCustomerID = db.citizen.find({ name: "fyll" })._id;
db.orders.find({ productID: yourProductID, customerID: yourCustomerID });

/*=======================================================================================*/

// THIS IS WHAT WE WOULD DO IN THE noSQL WORLD

// working with only 2 tables
// reference driven approach

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
  orders: [{ productID: ObjectId("5b98d4654d01c52e1637a99b"), quantity: 300 }],
});

/*=======================================================================================*/

// depending on the type of your application

/* 
references not always are the perfect way for a ManyToMany:
how do you fetch your data?
how often do you change it??
and if you change it, do you need to change it everywhere or might duplicates be fine?
*/

// CUSTOMERS collection
db.customers.insertOne({
  name: "fyll",
  age: 18,
  orders: [
    {
      title: "Sotto le cuffie: Favij",
      type: "book",
      price: 12.99,
      quantity: 300,
    },
  ],
});

/* 
disadvantages: data duplication BUT
IF PRICE CHANGES in the future we will not change it for the existing order: people don't have to pay more after they bought it
IF TITLE CHANGES a bit it will not bother us:  is not going to change froma book to a t-shirt

( old snapshot ) => we don't care

we might not worry too much about duplicating that data becausebwe might not need
to change it in all the places where we did duplicate it if the original data changes 
*/
