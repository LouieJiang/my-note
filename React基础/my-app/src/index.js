// 控制逻辑 数据 -> VDom
import React from 'react';
// 渲染实际DOM VDom-> DOM
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/ReduxStore'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// 可以在 src/index.js 的 render ⾥订阅状态变更 (subscribe)
// const render = () => {
//   ReactDOM.render(<App />, document.querySelector('#root'))
// }
// render()
// store.subscribe(render)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
