//                       I  N  T  3  2

// age of a person
NumberInt(30);
NumberInt("30");

//                        L  O  N  G

// company valuation

// if number >> 2billions (2,147,483,647)
// it does not give an error but the number stored is totally wrong

// you should be using quotetion makrs ""
// avoiding JS limitation

NumberLong("2147483648");

//                     D O I N G   M A T H

// not just text?
// storing as text is a bad idea => can't do calculations
// can't use $inc etc.

db.account.insertOne({ name: "Fyll", account: NumberLong("10000000") });
db.account.insertOne(
  { name: "Fyll" },
  { $inc: { account: NumberLong("1000000") } }
);

// use science collection

db.science.insertOne({ a: 0.3, b: 0.5 });

db.science.aggregate([{ $project: { result: { $subtract: ["$a", "$b"] } } }]);
// result : 0.19999999999999999998
// there is imprecision in floats!

//                       D E C I M A L   1 2 8

// high precision double

db.science.insertOne({ a: NumberDecimal("0.3"), b: NumberDecimal("0.5") });

db.science.aggregate([{ $project: { result: { $subtract: ["$a", "$b"] } } }]);
// result : 0.2

db.account.insertOne({}, { $inc: { a: NumberDecimal("0.1") } });
