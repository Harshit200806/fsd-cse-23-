console.log("data1");

console.log("data2");

const f = require("fs");

f.writeFileSync("output.txt", "hello to all, I am Harshit Namdev");

f.appendFileSync("output2.txt", "\nupdate data");

console.log("data3");

console.log("data4");

const r = f.readFileSync("output.txt");

console.log(r.toString());

const r2 = f.readFileSync("output.txt", "utf-8");

console.log(r2);