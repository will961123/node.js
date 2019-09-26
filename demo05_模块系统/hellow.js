function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() { 
    console.log(`我的名字是${this.name}${this.age}岁`);
};
module.exports = { Person };
