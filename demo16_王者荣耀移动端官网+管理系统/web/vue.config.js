module.exports = {
  // 打包到哪个文件夹
  outputDir: __dirname + "/../server/public/web",
  // 静态资源引用路径
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
};
