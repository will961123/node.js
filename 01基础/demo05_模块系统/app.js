const fs = require("fs");
const hello = require("./hellow");
hello.Person();
let p1 = new hello.Person("李拴蛋", 18);
p1.say()
