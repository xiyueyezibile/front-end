const express = require("express")
const path = require("path")
//创建服务器实例
const app = express()
/*
    服务器中的代码对于外部都是不可见的
所以如果希望浏览器可以访问，则要将页面设置静态资源
*/ 
//设置static中间件后，浏览器访问时，会自动去public目录下寻找是否有匹配的静态资源
app.use(express.static(path.resolve(__dirname,"./public")))

//配置路由
app.get("/",(req,res)=>{
    res.send("这是helllo路由")
})

app.get("/login",(req,res)=>{
    //获取到用户输入的用户名和密码
    console.log(req.query.username);

    //验证用户名输入的用户名和密码是否正确
    console.log("请求已经收到");
    res.send("登陆成功")
})


//启动服务器
app.listen(3000,()=>{
    console.log("服务器已启动~");
})