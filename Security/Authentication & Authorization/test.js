// create admin

// [shell] use admin
db.createUser({ user: "fyll", pwd: "fyll", roles: ["userAdminAnyDatabase"] });

// login as admin
db.auth("fyll", "fyll");

// create dbAdmin
db.createUser({
  user: "globalAdmin",
  pwd: "admin",
  roles: ["dbAdminAnyDatabase"],
});

// create developer
db.createUser({
  user: "dev",
  pwd: "dev",
  roles: [
    { role: "readWrite", db: "sales" },
    { role: "readWrite", db: "costumers" },
  ],
});

// close session
// [shell] ctrl + C

// new session
// login

// [shell] mongo -u fyll -p fyll --authenticationDatabase admin
// [shell] mongo -u globalAdmin -p admin --authenticationDatabase admin
// [shell] mongo -u dev-p dev--authenticationDatabase admin
