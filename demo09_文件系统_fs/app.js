const fs = require("fs");
// 异步读取文件
fs.readFile("input.txt", function(err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("异步读取1", data.toString());
});
// 同步读取文件
let data = fs.readFileSync("input.txt");
console.log("同步读取", data.toString());

/**
 * 打开文件 fs.open(path, flags[, mode], callback)
 * flags 参数可以是以下值：
 * r 以读取模式打开文件。如果文件不存在抛出异常。
 * r+ 以读写模式打开文件。如果文件不存在抛出异常。
 * rs 以同步的方式读取文件。
 * rs+ 以同步的方式读取和写入文件。
 * w 以写入模式打开文件，如果文件不存在则创建。
 * wx 类似 'w'，但是如果文件路径存在，则文件写入失败。
 * w+ 以读写模式打开文件，如果文件不存在则创建。
 * wx+ 类似 'w+'， 但是如果文件路径存在，则文件读写失败。
 * a 以追加模式打开文件，如果文件不存在则创建。
 * ax 类似 'a'， 但是如果文件路径存在，则文件追加失败。
 * a+ 以读取追加模式打开文件，如果文件不存在则创建
 * ax+ 类似 'a+'， 但是如果文件路径存在，则文件读取追加失败
 */
console.log("准备打开文件");
fs.open("./input.txt", "r+", function(err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("文件打开成功");
});

/**
 * 获取文件信息 fs.stat(path, callback)
 * path - 文件路径。
 * callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
 * fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
 */
/**
 * stats类中的方法有：
 * stats.isFile() 如果是文件返回 true，否则返回 false
 * stats.isDirectory() 如果是目录返回 true，否则返回 false。
 * stats.isBlockDevice() 如果是块设备返回 true，否则返回 false。
 * stats.isCharacterDevice() 如果是字符设备返回 true，否则返回 false。
 * stats.isSymbolicLink() 如果是软链接返回 true，否则返回 false。
 * stats.isFIFO() 如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
 * stats.isSocket() 如果是 Socket 返回 true，否则返回 false。
 */
fs.stat("./input.txt", function(err, stats) {
  if (err) {
    return console.error(err);
  }
  console.log("文件读取成功", stats);
  console.log("是否是文件" + stats.isFile());
  console.log("是否是目录" + stats.isDirectory());
});

/**
 * 异步模式下写入文件 fs.writeFile(file, data[, options], callback)
 * writeFile 直接打开文件默认是 w 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。
 * file - 文件名或文件描述符。
 * data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
 * options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
 * callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
 */
fs.writeFile("input.txt", "通过fs.writefile写入文件", function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("数据写入成功");
  fs.readFile("input.txt", function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log("异步读取2", data.toString());
  });
});

/**
 * 读取文件 fs.read(fd, buffer, offset, length, position, callback)
 * fd - 通过 fs.open() 方法返回的文件描述符。
 * buffer - 数据写入的缓冲区。
 * offset - 缓冲区写入的写入偏移量。
 * length - 要从文件中读取的字节数。
 * position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
 * callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
 */
var buf = new Buffer.alloc(1024);
fs.open("input.txt", "r+", function(err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("打开成功");
  console.log("准备打开文件");
  fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
    if (err) {
      return console.error(err);
    }
    console.log("读取了" + bytes + "字节");
    // 输出读取的字节
    if (bytes > 0) {
      console.log(buf.slice(0, bytes).toString());
    }
  });
});

/**
 * 关闭文件 fs.close(fd, callback)
 * fd - 通过 fs.open() 方法返回的文件描述符。
 * callback - 回调函数，没有参数。
 */
var buf = new Buffer.alloc(1024);
fs.open("input.txt", "r+", function(err, fd) {
  if (err) {
    return console.error(err);
  }
  fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
    if (err) {
      return console.error(err);
    }
    if (bytes) {
      console.log(buf.slice(0, bytes).toString());
    }
    // 关闭文件
    fs.close(fd, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log("文件关闭成功");
    });
  });
});

/**
 * 截取文件 fs.ftruncate(fd, len, callback)
 * fd - 通过 fs.open() 方法返回的文件描述符。
 * len - 文件内容截取的长度。
 * callback - 回调函数，没有参数。
 */
var buf = new Buffer.alloc(1024);
fs.open("input.txt", "r+", function(err, fd) {
  if (err) {
    return console.error(err);
  } 
  console.log("截取10字节内的文件内容，超出部分将被去除。"); 
  // 截取文件
  fs.ftruncate(fd, 10, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("文件截取成功。");
    console.log("读取相同的文件");
    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
      if (err) {
        console.log(err);
      } 
      // 仅输出读取的字节
      if (bytes > 0) {
        console.log(buf.slice(0, bytes).toString());
      } 
      // 关闭文件
      fs.close(fd, function(err) {
        if (err) {
          console.log(err);
        }
        console.log("文件关闭成功！");
      });
    });
  });
});

/**
 * 删除文件 fs.unlink(path, callback)
 */