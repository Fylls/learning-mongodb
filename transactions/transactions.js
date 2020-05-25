db.users.insertOne({ name: "max" });
// ObjectId("22nk5pr9fk4lds4lf84lf")

db.posts.insertMany([
  { title: "first post", userId: ObjectId("22nk5pr9fk4lds4lf84lf") },
  { title: "second post", userId: ObjectId("22nk5pr9fk4lds4lf84lf") },
]);

// if user chooses to delete his account: TYPICAL USECASE

// in "users" db
db.users.deleteOne({ _id: ObjectId("22nk5pr9fk4lds4lf84lf") });
// in "posts" db
db.posts.deleteMany({ userId: ObjectId("22nk5pr9fk4lds4lf84lf") });

/*==========================================================================*/

//                       TRANSATIONS

// session = all requested grouped together logically

const session = db.getMongo().startSession();
session.startTransaction();

// reference to collections
const usersCol = session.getDatabase("blog").users;
const postsCol = session.getDatabase("blog").posts;

// db.users.find() => user max is here
usersCol.deleteOne({ _id: ObjectId("22nk5pr9fk4lds4lf84lf") });
// db.users.find() => user max is STILL here

// db.posts.find() => posts of user max are here
postsCol.deleteMany({ userId: ObjectId("22nk5pr9fk4lds4lf84lf") });
// db.posts.find() => posts of user max are STILL here

// commit changes to real db
session.commitTransaction(); // changes applied

// (this commmand just in case )
// aborting : stopping transaction
session.abortTransaction(); // changes not applied

/*
    #1  create session
    #2  assigning collections to session
    #3  applying crud operations desidered
    #4  commit//abort transaction
*/

// atomicity across collections
//  either all element inserted or none at all

/*

    #1 
        const session = db.getMongo().startSession();
        session.startTransaction();

    #2
        const usersCol = session.getDatabase("blog").users;
        const postsCol = session.getDatabase("blog").posts;

    #3  
        usersCol.deleteOne({ _id: ObjectId("22nk5pr9fk4lds4lf84lf") });
        postsCol.deleteMany({ userId: ObjectId("22nk5pr9fk4lds4lf84lf") });

    #4
        session.commitTransaction()
      OR
        session.abortTransaction()

*/
