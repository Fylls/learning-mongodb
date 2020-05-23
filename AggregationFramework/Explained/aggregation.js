// complex tranformation to data

// YOU SHOULD store in db data in the same format you need in your application
// this is not always possible => VERSATILE DATA

// aggregation framework is a FIND method but more powerfull
// alterative to find
// building a pipeline of stages athat give you the right output

// (process running in mongodb server)

const personExample = {
  // general format of what we are working on
  gender: "male",
  name: { title: "mr", first: "zachary", last: "lo" },
  location: {
    street: "3193 king st",
    city: "chipman",
    state: "yukon",
    postcode: "H8N 1Q8",
    coordinates: { latitude: "76.4507", longitude: "-70.2264" },
    timezone: {
      offset: "+11:00",
      description: "Magadan, Solomon Islands, New Caledonia",
    },
  },
  email: "zachary.lo@example.com",
  login: {
    uuid: "76970c67-4801-4926-80f0-4872fe0aee42",
    username: "lazyrabbit189",
    password: "pass1",
    salt: "BVMLMPwZ",
    md5: "a6ff61f912af9958587e0fc0c8dc920b",
    sha1: "bd37d1c699fb5a17031924c37e5d90ba4403e598",
    sha256: "0305e3ebf6f4502790d804cff5989a6a928f466af6e36bd808ad9ed24e51fee7",
  },
  dob: { date: "1988-10-17T03:45:04Z", age: 29 },
  registered: { date: "2011-09-29T20:54:32Z", age: 6 },
  phone: "273-427-0510",
  cell: "309-911-7770",
  id: { name: "", value: null },
  picture: {
    large: "https://randomuser.me/api/portraits/men/9.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/9.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/9.jpg",
  },
  nat: "CA",
};

//               `         A G G R E G A T I O N

db.persons.aggregate([
  { $match: { gender: "female" } }, // same to find

  // _id defines which filed you want to group
  // totalPerson is a new field we are creating, it counts the number of peole in a state
  { $group: { _id: { state: "$location.stage" }, totalPersons: { $sum: 1 } } },

  // sorting acending order in totalPersons
  // sort on output of last stage
  { $sort: { totalPersons: -1 } },
]);

// example 2
db.persons.aggregate([
  { $match: { "dob.age": { $gt: 50 } } },

  {
    $group: {
      _id: { gender: "$gender" },
      totalPersons: { $sum: 1 },
      averageAge: { $avg: "dob.age" },
    },
  },

  { $sort: { totalPersons: -1 } },
]);

// $project

// same functionalities
db.persons.find({}, { gender: 1, _id: 0 });
db.persons.aggregate([{ $project: { _id: { gender: 1, _id: 0 } } }]);

// creating new fields on the fly
// .concat concats to string
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      _id: 0,
      email: 1,
      location: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } }, // first letter uppercse (firstname)
          {
            $substrCP: [
              "$name.first",
              1,
              { $subtract: [{ $strLenCP: "$name.first" }, 1] }, // rest of the firstname lowercase
            ],
          },
          "", // white space
          { $toUpper: { $substrCP: ["$name.last", 0, 1] } }, // first letter uppercase (lastname)
          {
            $substrCP: [
              "$name.last",
              1,
              { $subtract: [{ $strLenCP: "$name.last" }, 1] }, // rest of the lastname lowercase
            ],
          },
        ],
      },
    },
  },
]);

// from location to geoJSON
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      location: {
        type: "Point",
        coordinates: [
          {
            $convert: {
              input: "$location.coordinates.longitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
            },
          },
          {
            $convert: {
              input: "$location.coordinates.latitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
            },
          },
        ],
      },
    },
  },
]);

//age
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      birthday: { $toDate: "$dob.date" },
      age: "$dob.age",
    },
  },
]);

// simple convert
db.persons.aggregate([
  {
    $project: {
      // birthday: { $convert: { input: "$dob.date", to: "date" } },
      birthday: { $toDate: "$dob.date" },
    },
  },
]);

//iso week year
db.persons.aggregate([
  {
    $project: {
      // birthday: { $convert: { input: "$dob.date", to: "date" } },
      birthday: { $toDate: "$dob.date" },
    },
  },
]);

//all together
db.persons.aggregate([
  // #1 age
  {
    $project: {
      _id: 0,
      birthday: { $convert: { input: "$dob.date", to: "date" } },
      age: "$dob.age",
    },
  },
  // #2 geo
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthday: 1,
      age: 1,
      location: {
        type: "Point",
        coordinates: [
          {
            $convert: {
              input: "$location.coordinates.longitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
            },
          },
          {
            $convert: {
              input: "$location.coordinates.latitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
            },
          },
        ],
      },
    },
  },
  // #3 name
  {
    $project: {
      gender: 1,
      _id: 0,
      email: 1,
      location: 1,
      name: 1,
      birthday: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
          {
            $substrCP: [
              "$name.first",
              1,
              { $subtract: [{ $strLenCP: "$name.first" }, 1] },
            ],
          },
          "",
          { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
          {
            $substrCP: [
              "$name.last",
              1,
              { $subtract: [{ $strLenCP: "$name.last" }, 1] },
            ],
          },
        ],
      },
    },
  },

  // #4 group
  {
    $group: {
      _id: { birthYear: { $isoWeekYear: "$birthdate" } },
      numPersons: { $sum: 1 },
    },
  },

  // #5 sort
  { $sort: { numPersons: -1 } },
]);
