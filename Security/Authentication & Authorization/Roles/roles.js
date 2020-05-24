//                     CREATE ADMIN ROLE

db.createUser({ user: "Fyll", pwd: "1234", roles: ["userAdminAnyDatabase"] });

/*=============================ADMIN=======================================*/

//                         LOGIN AS ADMIN

// [shell] mongo -u Fyll -p 1234 --authenticationDatabase admin

//or
// [shell] use admin
db.auth("Fyll", "1234");

//                   CREATE USER (in "shop" db)

// [shell] use shop
db.createUser({ user: "appdev", psw: "dev", roles: ["readWrite"] });

// update user
// role replaced not added
db.updateUser("appdev", {
  roles: ["readWrite", { role: "readWrite", db: "blog" }],
});

db.getUser("appdev");

db.logout();

/*==============================USER=======================================*/

//                          LOGIN AS USER

// [shell] mongo -u appdev -p dev --authenticationDatabase shop
// [shell] use shop

// here product is a collection inside "shop" db
db.products.insertOne({ name: "Book" });
