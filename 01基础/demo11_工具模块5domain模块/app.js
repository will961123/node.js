const domain = require("domain");
const EventEmitter = require("events").EventEmitter;

/**
 * Node.js Domain(域) 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的异常
 *
 * domain模块，把处理多个不同的IO的操作作为一个组。注册事件和回调到domain，
 * 当发生一个错误事件或抛出一个错误时，domain对象会被通知，不会丢失上下文环境，也不导致程序错误立即退出，与process.on('uncaughtException')不同。
 * Domain 模块可分为隐式绑定和显式绑定：
 *        隐式绑定: 把在domain上下文中定义的变量，自动绑定到domain对象
 *        显式绑定: 把不是在domain上下文中定义的变量，以代码的方式绑定到domain对象
 *
 *
 * 方法
 * domain.run(function)
 * 在域的上下文运行提供的函数，隐式的绑定了所有的事件分发器，计时器和底层请求。
 * domain.add(emitter)
 * 显式的增加事件
 * domain.remove(emitter)
 * 删除事件。
 * domain.bind(callback)
 * 返回的函数是一个对于所提供的回调函数的包装函数。当调用这个返回的函数时，所有被抛出的错误都会被导向到这个域的 error 事件。
 * domain.intercept(callback)
 * 和domain.bind(callback) 类似。除了捕捉被抛出的错误外，它还会拦截 Error 对象作为参数传递到这个函数。
 * domain.enter()
 * 进入一个异步调用的上下文，绑定到domain。
 * domain.exit()
 * 退出当前的domain，切换到不同的链的异步调用的上下文中。对应domain.enter()。
 * domain.dispose()
 * 释放一个domain对象，让node进程回收这部分资源。
 * domain.create()
 * 返回一个domain对象。
 *
 *
 * 属性
 * domain.members
 * 已加入domain对象的域定时器和事件发射器的数组。
 */

// 创建监听器1
let emitter1 = new EventEmitter();
// 创建域1
let domain1 = domain.create();
// 显式绑定
domain1.add(emitter1);
// 创建域的监听事件
domain1.on("error", err =>
  console.log(`创建的域1 处理这个错误 ${err.message}`)
);
// 创建监听器的监听事件
emitter1.on("error", err => console.log(`监听器1 处理这个错误 ${err.message}`));
// 发布error事件 此时监听器捕获处理
emitter1.emit("error", new Error("监听器"));
// 移除监听器的error监听
emitter1.removeAllListeners("error");
// 发布error事件 此时创建的域捕获处理
emitter1.emit("error", new Error("域1"));

// 创建域2
let domain2 = domain.create(); 
// 创建域的监听事件
domain2.on("error", err =>
  console.log(`创建的域2 处理这个错误 ${err.message}`)
);
// 隐式绑定
domain2.run(() => {
  // 创建监听器2
  let emitter2 = new EventEmitter();
  emitter2.emit("error", new Error("域2"));
});

domain1.remove(emitter1);
emitter1.emit("error", new Error("转换为异常，系统将崩溃!"));
