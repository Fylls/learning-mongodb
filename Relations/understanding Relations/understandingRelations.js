// if strongly related to costumer and you want to fetch both at the same time in an easy way=> embedded

// customers, each customer has list of his fab books
exaple = { userName: "fyll", favBooks: ["{...}, {...}, {...}, {...}"] };
// loads of duplicates and if you want to change you have to change for all custoemrs

//here ref is better, customer and book collection, in costumer storing only ids of fav books, when fetch 2 queries,
// so if youu want to change book you only have to do it 1 time in a clean doc
