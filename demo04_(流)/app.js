/**
 * Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
 * Node.js，Stream 有四种流类型：
 * Readable - 可读操作。
 * Writable - 可写操作。
 * Duplex - 可读可写操作.
 * Transform - 操作被写入数据，然后读出结果。
 *
 * 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
 * data - 当有数据可读时触发。
 * end - 没有更多的数据可读时触发。
 * error - 在接收和写入过程中发生错误时触发。
 * finish - 所有数据已被写入到底层系统时触发。
 */
const fs = require("fs");
fs.writeFileSync("writeTet.txt", '创建一个文本' );

/**
 * 从流中读取数据
 */
var tet = '';
// 创建可读流
var readerStream = fs.createReadStream('writeTet.txt');
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
    tet += chunk;
});
readerStream.on('end',function(){
   console.log('流读取完毕',tet);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕-读取");

/**
 * 写入流
 */ 
var data = '写入流-写一段话'; 
// 创建一个可以写入的流，写入到文件 writeTet.txt 中
var writerStream = fs.createWriteStream('writeTet.txt'); 
// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8'); 
// 标记文件末尾
writerStream.end(); 
// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("流写入完成。");
}); 
writerStream.on('error', function(err){
   console.log(err.stack);
}); 
console.log("程序执行完毕-写入");

/**
 * 管道流
 */