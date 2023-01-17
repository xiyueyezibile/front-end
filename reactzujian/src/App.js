// const App = () => {
//   return <div>我是App组件</div>
// }
// import React from "react"
// //类组件
// class App extends React.Component {
//   //类组件中必须添加render方法，且方法的返回值要是JSX
//   render() {
//     return <div>我是一个类组件</div>
//   }
// }

// 用组件修改之前的练习
import Logs from "./Compotents/logs/Logs"
import LogsForm from "./Compotents/logsForm/LogsForm"
import "./App.css"
import { useState } from "react"
const App = () => {
  //模拟数据库数据
  const [logsData,setLogsData] = useState([
      {
        id:1,
        date:new Date(2021,10,20),
        desc:"学习前端",
        time:"50"
      },
      {
        id:2,
        date:new Date(2022,11,21),
        desc:"学习React",
        time:"30"
      },
      {
        id:3,
        date:new Date(2022,4,18),
        desc:"学习JS",
        time:"25"
      }
    ])
  //将LogsForm中的数据传递给App组件，由App组件添加到数据中
  const saveLogHandler = (newLog) => {
    // console.log(newLog);
    //向新日志添加id
    newLog.id = logsData[logsData.length - 1].id + 1
    //添加到数组中
    
    setLogsData([...logsData,newLog])
  }
  //定义一个函数，从数据中删除一条日志
  const delLogByIndex = (index) => {
    
    setLogsData(prevState => {
      const newLogs = [...prevState]
      newLogs.splice(index,1)
      return newLogs
    })
  }
  return <div className="app">
    <LogsForm onSaveLog={saveLogHandler} />
    <Logs logsData={logsData} onDelLog={delLogByIndex} />
    </div>
}

// import { useState } from "react"
// import { useRef } from "react"
// const App = () => {
//   //state这个变量在React中进行了注册，React会监测这个变量的变化
//   //变化后会自动进行重新渲染
//   //在函数组件中，我们需要钩子函数获取state
//   //要import { useState } from "react"
//   //useState(初始值)便可以创建
//   //该函数会返回一个数组，数组中第一个元素是初始值，第二个元素是一个函数
//   //初始值只用来显示数据，直接修改不会触发组件的重新渲染
//   //函数通常会命名为setxxx，这个函数调用它修改state后会触发组件的重新渲染setxxx(新state)
//   //并且使用函数中的值作为新的state值
//   const result = useState(2)
//   let count = result[0]
//   let setcount = result[1]
//   function addone() {
//     console.log(h1Ref);
//     setcount(count + 1)
//   }
//   function declineone() {
    
//     setcount(count - 1)
//   }
//   //直接从react处获取dom对象
//   //钩子函数只能用于函数租金或自定义钩子函数中用
//   //钩子函数只能直接在函数组件中调用
//   //1.创建存储dom对象的容器
//   //要引用import { useRef } from "react"
//   //使用useRef()钩子函数
//   const h1Ref = useRef()//创建一个容器
  
//   return <div ref={h1Ref}>
//     <h1>{count}</h1>
//     <button onClick={addone}>+1</button>
//     <button onClick={declineone}>-1</button>
//   </div>
// }

// //类组件
// import { Component } from "react"

// class App extends Component {
//   state = {
//     count:11
//   }
//   add = ()=>{
//     this.setState(prevState => {
//       return {
//         count:prevState.count + 1
//       }
//     })
//   }
//   render() {
//     return <div onClick={this.add}>{this.state.count}</div>
//   }
// }

//导出App
export default App