var fs = require("fs");
var data = fs.readFileSync("test.js");
console.log(data.toString());
console.log("ProgramEnded");