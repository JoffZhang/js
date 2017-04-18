var util = require('util');

//printing to console
process.stdout.write("Hello World!" + "\n");

//reading passed parameter
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

//executable path
console.log(process.execPath);

//print the current directory
console.log('Current directory: ' + process.cwd());
	
//print the process version
console.log('Current version: ' + process.version);

//print the memory usage
console.log(util.inspect(process.memoryUsage()));