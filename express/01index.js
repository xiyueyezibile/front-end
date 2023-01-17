//引入express
const express = require("express")
//获取服务器的对象
const app = express()
/*
    如果希望服务器可以正常访问，则需要为服务器设置路由
        路径可以根据不同的请求方式和请求地址来处理客户的请求
        app.METHOD(...)
        METHOD 可以是get或者post


    中间件
        -在express中，我们使用app.use来定义一个中间件
            中间件和路由很像，用法也很像
            但中间件不会检测你返回的请求，全都要
            而且路径设置父目录，只要前面一样就会访问
*/

app.use("/",(req,res,next)=>{
    console.log("收到请求");
    // res.send("这是通过中间件返回的响应")
    next()//放行
})
app.use("/",(req,res,next)=>{
    console.log("收到请求s");
    // res.send("这是通过中间件返回的响应")
    next()//放行
})
app.use("/",(req,res)=>{
    console.log("收到请求a");
    res.send("这是通过中间件返回的响应1")
})







//"/"表示根目录
//路由的回调函数执行时，会收到三个参数
//第一叫做request，第二叫做response，第三个叫next，他是一个函数
//调用函数后，可以触发后面的中间件,它不能在响应处理完毕后调用
// app.get("/",(req,res)=>{
//     console.log("有人访问我了");//当有人访问根目录地址时，调用回调函数
//     //在路由中要做两件事
//     //读取客户请求(request)
//     //req表示用户的请求信息，通过req可以获取用户的请求信息
//     // console.log(req.url);
//     //根据客户请求返回响应(response)
//     //服务器通过res发送给客户端返回数据
//     // res.sendStatus(404)//向客户端发送响应状态码
//     res.status(200)//设置响应状态码，但是并不发送
//     res.send("你的请求没问题，但就是不给你看")//设置并发送响应体
// })
//启动服务器
//app.listen(端口号) 用来启动服务器
//服务器启动后，便可以通过3000端口访问服务器
//协议名://ip地址:端口号/路径
//http://localhost:3000
//http://127.0.0.1(本地)


app.listen(3000,()=>{
    console.log("服务器启动才执行");
})
