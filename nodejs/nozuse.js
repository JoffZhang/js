var fs = require("fs");
fs.readFile("test.js",function(err,data){
	if(err) return console.error(err);
	console.log(data.toString());
});
console.log("Program Ended");