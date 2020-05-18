//                      O P E R A T O R S

/*
    $set:       create/updates a filed
    $unset:     drops a field

    $inc:       increments a value

    $min:       updates value if current is lower
    $max:       updates value if current is greater
    $mul:       multiplies


    $rename:    renames a field
    $mul:       multiplies


*/

// INC (incrementing a value)
db.users.updateOne({ name: "fyll" }, { $inc: { age: 1 } });

// set a certain filed a certain value but only if it is currently higher, not lower and vice versa

//                              MIN

// (fyll.age = 40) lower
db.users.updateOne({ name: "fyll" }, { $min: { age: 35 } });
// (fyll.age = 35)

// (fyll.age = 35) higher => no change
db.users.updateOne({ name: "fyll" }, { $min: { age: 38 } });
// (fyll.age = 35)

//                              MAX

// (fyll.age = 40) higher => no change
db.users.updateOne({ name: "fyll" }, { $max: { age: 35 } });
// (fyll.age = 40)

// (fyll.age = 35) lower
db.users.updateOne({ name: "fyll" }, { $max: { age: 38 } });
// (fyll.age = 38)

//                              MUL

// his age has doubled
// (fyll.age = 40)
db.users.updateOne({ name: "fyll" }, { $mul: { age: 2 } });
// (fyll.age = 80)

//                      GETTING RID OF FIELDS

// not the perfect solution: phone field is still there
db.users.updateMany({ isSporty: true }, { $set: { phone: null } });

//                              UNSET

// removes phone field
db.users.updateMany({ isSporty: true }, { $unset: { phone: "" } });

//                          RENAMING FIELDS

// from age to TotalAge
db.users.updateMany({}, { $rename: { age: "TotalAge" } });

//                              UPSERT()
// updating a field that you don't know whether it exists or not

// no matching => no change
db.users.updateMany(
  { name: "Maria" },
  {
    $set: {
      age: "29",
      isSporty: true,
      hobbies: [
        { title: "good food", frequency: 3 },
        { title: "yoga", frequency: 4 },
      ],
    },
  }
);

// update and insert
// if doc does not exist will be created

db.users.updateMany(
  { name: "Maria" }, // filter
  {
    //set

    $set: {
      age: "29",
      isSporty: true,
      hobbies: [
        { title: "good food", frequency: 3 },
        { title: "yoga", frequency: 4 },
      ],
    },
  },
  { upsert: true } // upsert
);
