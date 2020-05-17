//                      O P E R A T O R S

/*

$exist:     returns all item that have a desidered field
$type:      returns all docs with the desidered type

*/

db.users.insertMany([
  {
    name: "fyll",
    phone: 123456789,
    //age: 18 ======> no field (false)
    hobbies: [
      { title: "Sports", frequency: 3 },
      { title: "Cooking", frequency: 6 },
    ],
  },
  {
    name: "robrbio erbammarcia",
    phone: "3.1415926535",
    age: 99, // there is a filed (true)
    hobbies: [
      { title: "Cars", frequency: 2 },
      { title: "Cooking", frequency: 5 },
    ],
  },
]);

//                  $ E X I S T S   O P E R A T O R

// find all items that have age field
db.users.find({ age: { $exists: true } }); // if false they do not have that field

// age should exist and has to be greater than 30
db.users.find({ age: { $exists: true }, $gt: 30 });

db.users.insertOne({
  name: "graziano Sde grazialis",
  phone: "1.41421356237",
  age: null, // undefined
  hobbies: [
    { title: "Yoga", frequency: 2 },
    { title: "Cooking", frequency: 5 },
  ],
});

// now if I run I get back "graziano" since AGE FIELD EXISTS
// $exist doesn't depend on the value assigned, just cares about the field
db.users.find({ age: { $exists: true } });

// age exists and there is a value (not equal to null)
db.users.find({ age: { $exists: true, $ne: null } });

//                    $ T Y P E   O P E R A T O R

// find all users where phone number is a string
db.users.find({ phone: { $type: "string" } });

// "number" is an alias that sums up FLOATS and INTEGERS
db.users.find({ phone: { $type: "number" } });

// array of types
db.users.find({ phone: { $type: ["double", "string"] } });
