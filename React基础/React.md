## React 入门

[React](https://zh-hans.reactjs.org/)
https://zh-hans.reactjs.org/
[create-react-app](https://create-react-app.dev/docs/getting-started/)
https://create-react-app.dev/docs/getting-started/

##### 开始

1. 创建项⽬： npx create-react-app my-app
2. 打开项⽬： cd my-app
3. 启动项⽬： npm start
4. 暴露配置项： npm run eject

##### cra ⽂件结构

```
├── README.md          ⽂档
├── public             静态资源
│  ├── favicon.ico
│  ├── index.html
│  └── manifest.json
└── src                源码
    ├── App.css
    ├── App.js          根组件
    ├── App.test.js
    ├── index.css        全局样式
    ├── index.js         ⼊⼝⽂件
    ├── logo.svg
    └── serviceWorker.js pwa⽀持
├── package.json         npm 依赖
```

⼊⼝⽂件定义，webpack.confifig.js

```js
entry: [
// WebpackDevServer客户端，它实现开发时热更新功能
isEnvDevelopment &&
require.resolve('react-dev-utils/webpackHotDevClient'),
// 应⽤程序⼊⼝：src/index
paths.appIndexJs,
].filter(Boolean),
```

webpack.confifig.js 是 webpack 配置⽂件，开头的常量声明可以看出 cra 能够⽀持 ts、sass 及 css 模块化。

```js
// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig)
// style files regexes
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
```

> React 负责逻辑控制，数据 -> VDOM
>
> ReactDom 渲染实际 DOM，VDOM -> DOM
>
> React 使⽤ JSX 来描述 UI
>
> babel-loader 把 JSX 编译成相应的 JS 对象，React.createElement 再把这个 JS 对象构造成 React 需
>
> 要的虚拟 dom。

## JSX 语法

JSX 是⼀种 JavaScript 的语法扩展，其格式⽐较像模版语⾔，但事实上完全 是在 JavaScript 内部实现的。 JSX 可以很好地描述 UI，能够有效提⾼开发效率，体验[JSX]([JSX 简介 – React (reactjs.org)](https://zh-hans.reactjs.org/docs/introducing-jsx.html))

```js
// 基本使用 - 表达式{}
const name = 'react study'
const jsx = <div>hello, {name}</div>

// 函数 - 其实也是合法表达式
const user = {
  fistName: 'Harry',
  lastName: 'Potter'
}
function formatName(name) {
  return name.fistName + ' ' + name.lastName
}
const jsx = <div>{formatName(user)}</div>

// JSX对象 -  jsx是js对象，也是合法表达式
const greet = <div>good</div>
const jsx = <div>{greet}</div>

// 条件语句 - 条件语句可以基于上⾯结论实现
const show = true //false;
const greet = <div>good</div>
const jsx = (
  <div>
    {/* 条件语句 */}
    {show ? greet : '登录'}
    {show && greet}
  </div>
)

// 数组 - 数组会被作为⼀组⼦元素对待，数组中存放⼀组jsx可⽤于显示列表数据
const a = [0, 1, 2]
const jsx = (
  <div>
    {/* 数组 */}
    <ul>
      {/* diff时候，⾸先⽐较type，然后是key，所以同级同类型元素， key值必须得 唯⼀ */}
      {a.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

// 属性的使⽤
import logo from './logo.svg'
const jsx = (
  <div>
    {/* 属性：静态值⽤双引号，动态值⽤花括号；class、for等要特殊处 理。 */}
    <img src={logo} style={{ width: 100 }} className="img" />
  </div>
);

// CSS 模块化
import style from './index.module.css';
<img className={style.logo} />;

// 或者npm install sass -D
import style from './index.module.scss';
<img className={style.logo} />;
```

