const db = "database"; //placeholder

//prettier-ignore
db.createCollection("posts", {validator: { $jsonSchema: {/*schema validation*/}}})

db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
    },
  },
});
