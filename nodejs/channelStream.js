var fs = require("fs");
var readerStream = fs.createReadStream("test.txt");
var writerStream = fs.createWriteStream("test1.txt");
readerStream.pipe(writerStream);
console.log("Program Ended");