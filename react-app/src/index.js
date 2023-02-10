import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
//设置移动端适配
document.documentElement.style.fontSize = 100 / 750 + 'vw';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
