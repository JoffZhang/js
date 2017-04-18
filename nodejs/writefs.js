var fs = require("fs");
var data = "alibaba.com";
var writerStream = fs.createWriteStream("test.txt");
writerStream.write(data,"UTF8");
writerStream.end();
writerStream.on('finish',function(){console.log("write completed");});
writerStream.on("error",function(err){console.log("err.stack");});
console.log("Program Ended");