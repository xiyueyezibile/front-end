//入口文件
//引入ReactDOM
import ReactDOM from 'react-dom/client'
import './index.css'
//创建JSX
const App = <div className='logs'>
  {/* 日志项容器 */}
  <div className='item'>
{/* 日期容器 */}
    <div className='date'>
      <div className='month'>四月</div>
      <div className='day'>19</div>
    </div>
    {/* 日志内容的容器 */}
  <div className='content'>
    <h2 className="desc">学习React</h2>
    <div className="time">40分钟</div>
  </div>
  </div>
</div>
//获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(App)