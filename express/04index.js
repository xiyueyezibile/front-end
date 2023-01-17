const express = require("express")
const path = require("path")

//创建一个数组存储用户信息
const USERS = [
    {
        username:"admin",
        password:"123123",
        nickname:"超级管理员"
    },{
        username:"sunwukong",
        password:"123456",
        nickname:"齐天大圣"
    }

]


const app = express()
//配置静态资源
app.use(express.static(path.resolve(__dirname,"public")))
//引入解析请求体的中间件
app.use(express.urlencoded())

app.post("/login",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    // //获取用户的用户名和密码后，需要查找用户
    // for(const user of USERS) {
    //     if(user.username === username) {
    //         //用户存在，检测用户密码
    //         if(user.password === password) {
    //             //信息正确,登入成功
    //             res.send("登入成功" + user.nickname)
    //             return
    //         }
    //     }
    // }
    // res.send("用户名或密码错误")


   const loginuser = USERS.find((item)=>{
        return item.username === username && item.password === password
    })
    if(loginuser) {
        res.send("登入成功" + loginuser.nickname)
    }else {
        res.send("用户名或密码错误")
    }
})

app.post("/register",(req,res)=>{
    const {username,password,repassword,nickname} = req.body
    //验证用户名是否存在
    const user = USERS.find((item)=>{
        return item.username === username || item.nickname === nickname
    })
    //验证密码是否相同
    if(!user && password === repassword) {
        USERS.push({
            username,
            password,
            nickname
        })
        res.send("注册成功")
    } else {
        res.send("注册失败")
    }
    
})

app.listen(3000,()=>{
    console.log("服务器已经启动");
})