const events = require("events"); // 事件库
const util = require("util"); // 工具库
const fs = require("fs"); // 文件管理库

/**
 * 事件
 */


/**
 * EventEmitter的属性和方法
 * addListener(event, listener) 为指定事件添加一个监听器到数组尾部
 * on(event, listener) 为指定事件注册一个监听器，接受一个字符串和一个回调函数
 * once(event, listener) 为指定事件注册一个单次监听器，即事件最多会触发一次，触发后立即解除监听器
 * removeListener(event, listener) 移除指定事件的某个监听器，监听器必须要是该事件已经注册过的监听器 他接收两个参数 第一个是事件名 第二个是回调函数名称
 * removeAllListeners([event]) 如不传参移除所有事件的监听器 如果传参则移除指定时间的所有监听器
 * setMaxListeners(n) 默认情况下EventEmitter如果你添加的监听器超过10个会输出警告信息，setMaxListeners函数用于改变监听器的默认限制数量
 * listeners(event) 返回指定事件的监听器数组
 * emit(event,[arg1],[...]) 按监听器的顺序执行执行每个监听器
 * */ 



// node.js 事件1
// 创建事件实例
let myEmitter = new events.EventEmitter(); 
// 监听someEvent事件
myEmitter.on("someEvent", function(msg) {
  console.log("第一个node.js事件触发了！" + msg);
});
// 发布someEvent事件 并传递参数
myEmitter.emit("someEvent", "哈哈");

// node.js 事件2
// 监听connection 事件
myEmitter.on("connection", function connectHandler() {
  // 执行
  console.log("数据库连接成功");
  // 触发data_received事件
  myEmitter.emit("data_received");
});
// 监听data_received 事件
myEmitter.on("data_received", function() {
  // 执行
  console.log("数据接收完成");
});
// 触发connection 事件
myEmitter.emit("connection");
console.log("程序执行完毕");

// node.js 事件3
// 同一个事件可以多次监听 当事件触发时，注册到这个事件的事件监听器被依次调用 
myEmitter.on("sendMsgEvent", function(msg) {
  console.log(msg + "1触发了");
});
myEmitter.on("sendMsgEvent", function(msg) {
  console.log(msg + "2触发了");
});
myEmitter.emit("sendMsgEvent", "事件"); 

// node.js 事件4
// 定义一个类
let Person = function(name) {
  this.name = name;
};
// inherits 继承  让Person类 继承events.EventEmitter类 使其可以绑定事件
util.inherits(Person, events.EventEmitter);
// 创建实例
let xiaoming = new Person("小明");
let lishuandan = new Person("李拴蛋");
let wanghuahua = new Person("王花花");
let PersonList = [xiaoming, lishuandan, wanghuahua];
// 为实例绑定事件
PersonList.forEach(function(item) {
  item.on("say", function(msg) {
    console.log(item.name + "说" + msg);
  });
});
// 发布事件
xiaoming.emit("say", "我是小明");
lishuandan.emit("say", "沙雕需求");
wanghuahua.emit("say", "王花花好啊"); 
 