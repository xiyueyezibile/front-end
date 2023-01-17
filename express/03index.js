const express = require("express")
const path = require("path")

const app = express()
//配置静态资源
app.use(express.static(path.resolve(__dirname,"public")))
//引入解析请求体的中间件
app.use(express.urlencoded())
//添加一个路由，可以读取get请求的参数
///login --> http://localhost/login
app.get("/login",(req,res)=>{
    //获取用户发送的数据
    if(req.query.username === "admin" && req.query.password === "123123"){
        res.send("<h1>登入成功</h1>")
    }else{
        res.send("<h1>用户名或密码错误</h1>")
    }
})

app.post("/login",(req,res)=>{
    //通过req.body获取请求体中的参数
    //默认情况下express不会自己解析请求体，需要通过中间件为其增加功能
    console.log(req.body);//undefined
    res.send("post请求已收到")
})

//get请求发送参数的第二种方式
// /hello/:id 当用户访问/hello/xxx时就会触发
//在路径中以冒号命名的部分称为param，在get请求中可以被当做请求参数
//param传参一般不会传特别复杂的参数
app.get("/hello/:id",(req,res)=>{
    //可以通过req.params属性来获取这些参数
    res.send("hello路由")
    console.log(req.params);

})

app.listen(3000,()=>{
    console.log("服务器已经启动");
})