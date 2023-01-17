const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")
const app = express()
const STU_ARR = [
  {
    id:"1",
    name:"孙悟空",
    age:18,
    gender:"男",
    address:"花果山"
  },
  {
    id:"2",
    name:"猪八戒",
    age:28,
    gender:"男",
    address:"高老庄"
  },
  {
    id:"3",
    name:"沙和尚",
    age:21,
    gender:"男",
    address:"流沙河"
  }
]

//中间件
app.use(express.urlencoded())
//解析JSON
app.use(express.json())
app.use((req,res,next)=>{
  //设置响应头
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PUT")
  res.setHeader("Access-Control-Allow-Headers","Content-type,authorization")
  //Access-Control-Allow-Methods 允许请求的方式
  //Access-Control-Allow-Headers 允许传递的请求头
  next()
})

//定义学生信息相关路由
app.get("/students",(req,res)=>{
  
  try {
    //读取请求头
  const token = req.get("authorization").split(" ")[1]
    const dtoken = jwt.verify(token,"chaojianquanmima")
    //返回学生信息
  res.send({
    status:"ok",
    result:STU_ARR
  })
  } catch (e) {
    res.status(403).send({
      status:"error",
      result:"token无效"
    })
  }
  console.log("收到get");
  
})

//定义登录路由
app.post("/login",(req,res)=>{

  //获取用户输入的用户名和密码
  const {username,password} = req.body
  //验证用户名和密码
  if(username == "admin" && password == "123123"){
    const token = jwt.sign({id:"123",
    username:"admin",
    nickname:"超级管理员"},"chaojianquanmima",{
      expiresIn:60 * 60 * 24
    })
    res.send({
      status:"ok",
      result:{
        token,
        nickname:"超级管理员"
      }
    })
  } else {
    res.status(403).send({
      status:"error",
      result:"用户名或密码错误"
    })
  }
})

//查询学生信息路由
app.get("/students/:id",(req,res)=>{
  const id = req.params.id
  const stu = STU_ARR.find(item => item.id == id)
  //返回
  res.send({
    status:"ok",
    result:stu
  })
})

//添加学生的路由
app.post("/students",(req,res)=>{
  console.log("收到post",req.body);
  //获取学生信息
  const {name,age,gender,address} = req.body
  //创建学生信息
  const stu = {
    id:+STU_ARR.at(-1).id + 1 + "",
    name,
    age:+age,
    gender,
    address
  }
  //将学生信息添加到数组
  STU_ARR.push({
    id:+STU_ARR.at(-1).id + 1 + "",
    name,
    age:+age,
    gender,
    address
  })
  //添加成功
  res.send({
    status:"ok",
    result:stu
  })
})

//删除学生信息的路由
app.delete("/students/:id",(req,res)=>{
  //获取id
  const id = req.params.id
  //遍历数组
  for(let i = 0;i < STU_ARR.length;i++) {
    if(STU_ARR[i].id == id) {
      const delStu = STU_ARR[i]
      STU_ARR.splice(i,1)
      //数据删除成功
      res.send({
        status:"ok",
        result:delStu
      })
      return
    }
  }
  //如果执行到这里，说明学生不存在
  res.status(404).send({
    status:"error",
    result:"学生id不存在"
  })

})

//修改学生的路由
app.put("/students",(req,res)=>{
  // 获取数据
  const {id,name,age,gender,address} = req.body
  //根据id查询学生
  const updateStu = STU_ARR.find(item => item.id == id)
  if(updateStu) {
    updateStu.name = name,
    updateStu.age = age,
    updateStu.gender = gender,
    updateStu.address = address
    res.send({
      status:"ok",
      result:updateStu
    })
  } else {
    res.status(404).send({
      status:"error",
      result:"学生不存在"
    })
  }
  

})

app.listen(3000,()=>{
  console.log("服务器已经启动");
})