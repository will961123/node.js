/**
 * Node.js 全局对象
 * JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
 * 在浏览器 JavaScript 中，通常 window 是全局对象，
 * 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
 */

// __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。
// 如果在模块中，返回的值是模块文件的路径。
console.log("__filename", __filename);

// __dirname 表示当前执行脚本所在的目录。
console.log("__dirname", __dirname);

/**
 * process
 * process 是一个全局变量，即 global 对象的属性。
 * process 常见的事件
 * exit 当进程准备退出时触发。
 * beforeExit 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出
 * ，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
 * uncaughtException 当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
 * Signal 事件 当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等
 */
process.on("exit", function(code) {
  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);

  console.log("退出码为:", code);
});
console.log("程序执行结束");
/**
 * process 常用的属性
 * stdout 标准输出流
 * stderr 标准错误流
 * stdin 标准输入流
 * argv 返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
 * execPath 返回执行当前脚本的 Node 二进制文件的绝对路径
 * execArgv 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数
 * env 返回一个对象，成员为当前 shell 的环境变量
 * exitCode 进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码
 * version Node 的版本，比如v0.10.18。
 * versions 一个属性，包含了 node 的版本和依赖.
 * config 一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。
 * pid 当前进程的进程号
 * title 进程名，默认值为"node"，可以自定义该值。
 * arch 当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。
 * platform 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
 * mainModule require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。
 * 
 */
// 输出到终端
process.stdout.write("Hello World!" + "\n"); 
// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
}); 
// 获取执行路径
console.log('获取执行路径',process.execPath); 
// 平台信息
console.log('平台信息'+process.platform);

/**
 * Process 提供了很多有用的方法，便于我们更好的控制系统的交互：
 * abort() 这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。
 * chdir(directory) 改变当前工作进程的目录，如果操作失败抛出异常。
 * cwd() 返回当前进程的工作目录
 * exit([code]) 使用指定的 code 结束进程。如果忽略，将会使用 code 0。
 * getgid() 获取进程的群组标识（参见 getgid(2)）。获取到得时群组的数字 id，而不是名字。
 * 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
 * setgid(id) 设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID 。
 * 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
 * getuid() 获取进程的用户标识(参见 getuid(2))。这是数字的用户 id，不是用户名。
 * 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
 * setuid(id) 设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。果指定了群组名，会阻塞等待解析为数字 ID 。
 * 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
 * getgroups() 返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是 node.js 保证有
 * 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
 * setgroups(groups) 设置进程的群组 ID。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力
 * 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)
 * initgroups(user, extra_group) 读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。
 * 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
 * kill(pid[, signal]) 发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'
 * memoryUsage() 返回一个对象，描述了 Node 进程所用的内存状况，单位为字节
 * nextTick(callback) 一旦当前事件循环结束，调用回调函数
 * umask([mask]) 设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码。
 * uptime() 返回 Node 已经运行的秒数
 * hrtime() 返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。
 * 主要用途是可以通过精确的时间间隔，来衡量程序的性能。你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔。
 */
// 输出当前目录
console.log('当前目录: ' + process.cwd()); 
// 输出当前版本
console.log('当前版本: ' + process.version); 
// 输出内存使用情况
console.log(process.memoryUsage());