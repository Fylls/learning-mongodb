db.persons.insertOne({ name: "fylls", age: 18 }, { writeConcern: { w: 1 } });

// w : 1
// DEFAULT
// I need to be sure that the server acknowledged it

// w : 0
// doesn't return ID, not stored in memory, not waiting to responce
// NEVER use this, only if you are ok with losing data (ex: logging data every seconds)

db.persons.insertOne(
  { name: "cola", age: 16 },
  { writeConcern: { w: 1, j: true } }
);

// j : undefined || false
// DEFAULT

// j : true
// a little bit slower, higher security
// waiting for server to write it in

db.persons.insertOne(
  { name: "albe", age: 18 },
  { writeConcern: { w: 1, j: true, wtimeout: 200 } }
);

// wtimeout : number
// if speed really matter OR you have a shaky connection
