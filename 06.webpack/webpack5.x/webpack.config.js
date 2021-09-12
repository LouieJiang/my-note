const path = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 入口（默认是"./src/index.js"）{String, Array}spa {Object}mpa
  // entry: "./src/index.js", // 单入口spa
  entry: {
    main: "./src/index.js", // 和上面等价
  },
  //   entry: {
  //     index: "./src/index.js",
  //     login: "./src/login.js",
  //   }, // 多入口mpa
  // 出口
  output: {
    // 保存位置（绝对路径，默认为"/dist"的绝对地址）
    path: path.resolve(__dirname, "./dist"),
    // 模块名称（默认是main.js）
    filename: "[name].js", // 占位符
  },
  // 模式 development production none
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.stylus$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: "wepback-demo",
      filename: "index.html",
      // template: path.resolve(__dirname, 'public/index.html'),//模板文件的路径
      template: "./public/index.html",
    }),
  ],
};
