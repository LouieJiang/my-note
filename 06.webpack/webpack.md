## webpack⼯程化实战

#### webpack⼊⻔

1. webpack简介

Webpack 是⼀个现代 JavaScript 应⽤程序的静态模块打包器（module bundler），当 webpack 处理应 ⽤程序时，它会递归地构建⼀个依赖关系图(dependency graph)，其中包含应⽤程序需要的每个模块， 然后将所有这些模块打包成⼀个或多个 bundle。 Webpack是⼀个打包模块化JavaScript的⼯具，它会从⼊⼝模块出发，识别出源码中的模块化导⼊语句，递归 地找出⼊⼝⽂件的所有依赖，将⼊⼝和其所有的依赖打包到⼀个单独的⽂件中 是⼯程化、⾃动化思想在前端开发中的体现。

>npm yarn pnpm cnpm npx nps nvm

2. webpack 安装

```
npm init -y # 初始化npm配置⽂件
npm install -D webpack@4 # 安装核⼼库
npm install -D webpack-cli@3 # 安装命令⾏⼯
```

3. 启动webpack

   1. webpack默认配置
      - webpack默认⽀持JS模块和JSON模块 
      - ⽀持CommonJS Es moudule AMD等模块类型 
      - webpack4⽀持零配置使⽤,但是很弱，稍微复杂些的场景都需要额外扩展
      
   2. 准备执⾏构建

      - 新建src⽂件夹 

      - 新建src/index.js、src/index.json、src/other.js

      ```js
      ### index.js
      const json = require("./index.json");//commonJS
      import { add } from "./other.js";//es module
      console.log(json, add(2, 3));
      ### index.json
      {
       "name": "JOSN"
      }
      ### other.js
      export function add(n1, n2) {
       return n1 + n2;
      }
      ```

      

   3. 执⾏构建

      ```powershell
      ### npx⽅式
      npx webpack
      
      ### npm script
      #  "scripts": {
      #  		"test": "webpack"
      #  }
      npm run test
      ```

      

   4. 构建成功

      ⽬录下多出⼀个 dist ⽬录，⾥⾯有个 main.js ，这个⽂件是⼀个可执⾏的JavaScript⽂件， ⾥⾯包含webpackBootstrap启动函数。

      

   5. 默认配置

      ```js
      const path = require("path");
      module.exports = {
       // 必填 webpack执⾏构建⼊⼝
       entry: "./src/index.js",
       output: {
       // 将所有依赖的模块合并输出到main.js
       filename: "main.js",
       // 输出⽂件的存放路径，必须是绝对路径
       path: path.resolve(__dirname, "./dist")
       }
      };
      ```

      

4. webpack配置核⼼概念

   - chunk：指代码块，⼀个 chunk 可能由多个模块组合⽽成，也⽤于代码合并与分割。
   - bundle：资源经过Webpack 流程解析编译后最终结输出的成果⽂件。 
   - entry：顾名思义，就是⼊⼝起点，⽤来告诉webpack⽤哪个⽂件作为构建依赖图的起点。 webpack会根据entry递归的去寻找依赖，每个依赖都将被它处理，最后输出到打包成果中。
   - output：output配置描述了webpack打包的输出配置，包含输出⽂件的命名、位置等信息。 
   - loader：默认情况下，webpack仅⽀持 .js .json ⽂件，通过loader，可以让它解析其他类型的 ⽂件，充当翻译官的⻆⾊。理论上只要有相应的loader，就可以处理任何类型的⽂件。 
   - plugin：loader主要的职责是让webpack认识更多的⽂件类型，⽽plugin的职责则是让其可以控制 构建流程，从⽽执⾏⼀些特殊的任务。插件的功能⾮常强⼤，可以完成各种各样的任务。 
   - webpack的功能补充 
   - mode：4.0开始，webpack⽀持零配置，旨在为开发⼈员减少上⼿难度，同时加⼊了mode的概念，⽤于指定打包的⽬标环境，以便在打包的过程中启⽤webpack针对不同的环境下内置的优化。
   
5. Plugins：webpack的扩展补充

   - 作⽤于webpack打包整个过程 

   - webpack的打包过程是有（⽣命周期概念）钩⼦

   plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念 扩展插件，在 Webpack 构建流程  中的特定时机注⼊扩展逻辑来改变构建结果或做你想要的事情。 作⽤于整个构建过程

   ```powershell
   npm install -D html-webpack-plugin clean-webpack-plugin
   ```

```js
plugins: [
    // 清理output
    new CleanWebpackPlugin(),
    // js挂载到HTML
    new htmlWebpackPlugin({
      title: "wepback-demo",
      filename: "index.html",
      // template: path.resolve(__dirname, 'public/index.html'),//模板文件的路径
      template: './public/index.html',
    }),
  ],
```

>htmlwebpackplugin会在打包结束后，⾃动⽣成⼀个html⽂件，并把打包⽣成的js模块引⼊到该html
>
>clean-webpack-plugin:如何做到dist⽬录下某个⽂件或⽬录不被清空： 使⽤配置 项:cleanOnceBeforeBuildPatterns 案例：cleanOnceBeforeBuildPatterns: ["/*", "!dll", "!dll/"], ！感 叹号相当于exclude 排除，意思是清空操作排除dll⽬录，和dll⽬录下所有⽂件。 注意：数组列表⾥的 “*/”是默认值，不可忽略，否则不做清空操作。

