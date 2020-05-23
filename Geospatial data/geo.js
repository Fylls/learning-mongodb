// point on a map
db.places.insertOne({ type: "Point", coordinates: [123.4734356, 37.7672544] });

// geospatial index
db.places.createIndex({ location: "2dsphere" });

// geo queries
//place is near to a chosen location??
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [123.4734356, 37.7672544] },
    },
  },
});

// max - min distance
// distance in a chosen radious

//which points are near this point?
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [123.4734356, 37.7672544] },
    },
    $maxDisatance: 30,
    $minDistance: 10,
  },
});

//2

// which point inside area?
const p1 = [10, 243];
const p2 = [69, 96];
const p3 = [55, 32];
const p4 = [52, 6];

// if polygon, needs to be closed : p1 , ... , p1

// $GEOWITHIN => finding places inside a certain area

db.places.find({
  location: {
    $geoWithin: {
      $geometry: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});

//2

// use area
// need to create a database for storing areas

db.areas.insertOne({
  name: "San Francisco",
  area: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
});

db.area.createIndex({ area: "2dsphere" });

// $GEOINTERSECT => fining out if a user is inside a specific arera

db.area.find({
  $geoIntersects: {
    $geometry: { type: "Point", coordinates: [123.4734356, 37.7672544] },
  },
});

// finding [all places within certain radious

db.area.find({
  $geoIntersects: {
    $geometry: { type: "Point", coordinates: [123.4734356, 37.7672544] },
  },
});
