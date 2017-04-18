var os = require("os");

//endianness
console.log('endianness : ' + os.endianness());

//type
console.log('type : ' + os.type());

//platform
console.log('platform : ' + os.platform());

//totalmem
console.log('total memory : ' + os.totalmem() + " bytes.");

//freemem
console.log('free memory : ' + os.freemem() + " bytes.");