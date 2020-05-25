// capped collections

/*

are a special type of collection which you have to create explicitly,
where you limit the amount of data or documents that can be stored in there.
old documents will simply be deleted when well this size is exceeded,

so it's basically a store where oldest data is automatically deleted when new data comes in.

This can be efficient for high throughput application logs where you only need the most recent logs
or as a caching service where you cache some data and if the data then was deleted because it
hasn't been used in a while, well then you're fine with that and you can just re-add it.

*/

// default limit: 4bytes

// size: how much bytes
// max: how much docs
db.createCollection("capped", { capped: true, size: 10000, max: 3 });

// in a capped collection the order we restrive is the same that we insert
// for a normal collection it is not guaranteed. (sorting by "createdAT or _id")
// first to insert => first to get

// retrive in reverse order
db.capped.find().sort({ $natural: -1 }).pretty();

// too many docs?
// no error => oldest document overwritten
// automatic deletion of old data
