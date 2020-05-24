//mongod --auth

// user who is allowed to create users in any databse
// ( no matter if db exists or will exist in the futrure )
db.createUser({ user: "Fyll", pwd: "Fyll", roles: ["userAdminAnyDatabase"] });
db.auth("Fyll", "Fyll"); // -user -pwd

// login
// mongo -u max -p max --authenticationDatabase admin
db.logout();
