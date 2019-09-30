const os = require("os");
/**
 * os.tmpdir() 返回操作系统的默认临时文件夹。
 * os.endianness() 返回 CPU 的字节序，可能的是 "BE" 或 "LE"。
 * os.hostname() 返回操作系统的主机名。
 * os.type() 返回操作系统名
 * os.platform() 返回编译时的操作系统名
 * os.arch() 返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"。
 * os.release() 返回操作系统的发行版本。
 * os.uptime() 返回操作系统运行的时间，以秒为单位。
 * os.loadavg() 返回一个包含 1、5、15 分钟平均负载的数组。
 * os.totalmem() 返回系统内存总量，单位为字节。
 * os.freemem() 返回操作系统空闲内存量，单位是字节。
 * os.cpus()返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、
 * 时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）。
 * os.networkInterfaces() 获得网络接口列表。
 * 
 * 属性 
 * os.EOL 定义了操作系统的行尾符的常量。
 */

 console.log('cpu字节序',os.endianness());
 console.log('操作系统名',os.type());
 console.log('编译时的操作系统名',os.platform());
 console.log('系统内存总量',os.totalmem()+'bytes');
 console.log('系统空闲内存量',os.freemem()+'bytes');
