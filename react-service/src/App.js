import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
import { Route } from "react-router";
import Home from "./Home";
const App = () => {
  // const [data,setData] = useState([])
  //只会在组件初始化的时候调用
  // useEffect(()=>{
  //   //在effect中加载数据
  //   fetch('http://127.0.0.1:3000/app')
  //   .then((res)=>res.json())
  //   .then(res=>{
      
  //     // useData(res)
  //     let newData = res.map(item => item.data)
  //     console.log(newData)
  //     setData(newData)
  //   })
  // },[])


  return <div>
    {
      111
      // data.map(item => item.name)
    }
    <Route path={"/a"} component={Home}/>
  </div>
}
export default App;
