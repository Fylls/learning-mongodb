const db = "database";

// this is an example of how a schema for a blog application might look like

//  database containing all USERS
db.users.inserMany([
  {
    userName: "fyll",
    firstName: "Filippo",
    lastName: "Sergenti",
    age: 18,
    email: "sergentifilippo@gamil.com",
  },
  {
    userName: "gianfry",
    firstName: "Gianfranco",
    lastName: "Erbaccotta",
    age: 19,
    email: "erbaccotta@gamil.com",
  },
  {
    //ObjectId("5b98d4654d01c52e1637a99b")
    userName: "gianfry",
    firstName: "Mimmo",
    lastName: "Quaquaraqua",
    age: 20,
    email: "quaquaraqua@gamil.com",
  },
  {
    //ObjectId("b732mv4fw8nptvs54nw5i7tk")
    name: "cola",
    firstName: "Francesco",
    lastName: "Cola",
    hobbies: "guardare i codici altrui", //noSQL
    age: 21,
    email: "codicialtri@gamil.com",
  },
]);

//  database containing all POSTS
db.posts.insertOne([
  {
    title: "my first post",
    text: "i hope you like it",
    tags: ["new", "tech", "religion", "ideale dell'ostrica"],
    creator: ObjectId("5b98d4654d01c52e1637a99b"),
    comments: [
      {
        text: "i don't like this post",
        author: ObjectId("b732mv4fw8nptvs54nw5i7tk"),
      },
    ],
  },
]);
