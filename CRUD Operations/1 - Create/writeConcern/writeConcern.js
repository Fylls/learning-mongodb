// additional fine used by storage engine that is similar to a TODO file, a backup
// if something happens to the server, file is saved on memory, server will look at j and do the things left
//      j : bool         (JOURNAL)

// how many instances do you want this writing to be acknowledge
//      w : number      (WRITING)

example = {
  w: 1, // storage engine is aware of it and it will write it on the disk
  j: undefined,
};

// only report a success for this write to me after it has been both acknowledged and been saved to the journal,
// so now I have a greater security that this will happen and succeed even if the server should face issues right now.
example2 = {
  w: 1,
  j: true, // <=
};

// which timeframe do you give your server to report a success for this write before you cancel it.
example2 = {
  w: 1,
  wtimeout: 200, // <=
  j: true,
};

// if you have some issues with the network connection or anything like that, you might simply timeout here,
// obviously setting this too low might timeout even though it would have perfectly succeeded normally and therefore
// you should know what you do when you set this timeout value because if you set it to a very low number,
// you might fail a lot even though there is no actual problem, just some small latency.
