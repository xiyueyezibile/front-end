const express = require("express")
const app = express()
const path = require("path")
const  fs = require("fs/promises")
//Router是express中创建的一个对象
const router = express.Router()
const cookieParser = require("cookie-parser")
const session = require("express-session")
const FileStore = require("session-file-store")(session)//传到上面引的session对象里
/*
    cookie的不足
    cookie是由服务器创建，浏览器保存
    每次浏览器访问服务器都需要将cookie发回
    导致我们不能在cookie中存储过多的数据
    并且cookie是村粗在客户端，容易被篡改
    注意：我们使用cookie一定不要存储敏感信息
    所以为了解决cookie的不足，我们希望
    将用户的数据存储在服务器中
    每一个用户的数据都有一个对应的id
    我们只需要通过cookie发送id给浏览器
    浏览器只需要把id发回即可读取信息
    这个技术我们称为session(会话)

    session是服务器的一个对象，用来存储用户数据
    每一个session对象都有一个唯一的id，id会通过cookie形式发送给客户端
    在express中可以通过express-session组件实现
    他也是一个中间件
    使用步骤：
    1.安装 npm i express-session
    2.引入 const session = require("express-session")
    3.设置为中间件app.use(session({...}))
    4.对session中的数据进行持久化操作（写到文件或数据库）
        这需要引入一个中间件session-file-store(存到文件)
        使用步骤：
        （1）安装npm i session-file-store
        （2）引入file-store
            const FileStore = require("session-file-store")(session)
        （3）设置中间件
            store: new FileStore({})
 */




let STUDENT_ARR = require("./data/students.json")

//将ejs设置为默认的模板引擎
app.set("view engine","ejs")
//配置模板路径
app.set("views",path.resolve(__dirname,"views"))
//配置静态资源路径
app.use(express.static(path.resolve(__dirname,"public")))
//配置请求体解析
app.use(express.urlencoded())
//配置cookie解析中间件
app.use(cookieParser())
//配置session中间件
app.use(session({
    secret:"hello",
    //配置sessionFileStore中间件
    store: new FileStore({
        //path指定session本地文件路径
        path:path.resolve(__dirname,'./sessions'),
        //加密
        secret:"haha",
        //session有效事件,单位 秒，默认一个小时
        ttl:60*60*24*30,
        cookie:{
            maxAge:1000*60*60*24*30
        },
        //默认情况下，fileStore会每隔一小时清除session对象，单位秒
        // reapInterval: 10
    })
}))




app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/get-cookie",(req,res)=>{
    //给客户发送一个cookie
    res.cookie("username","admin")
    console.log(req.session);
    res.send("cookie已经发送")
})

app.get("/delete-cookie",(req,res)=>{
    //cookie一旦发送给浏览器就不能修改了
    //我们可以通过发送新的同名cookie来覆盖之前的cookie
    res.cookie("username","",{
        maxAge:0
    })
    res.send("删除cookie")
})

app.get("/hello",(req,res)=>{
    //需要安装中间件使得express可以解析cookie
    //1.需要安装cookie-parser
    //2.引入const cookieParser = require("cookie-parser")
    //3.配置中间件app.use(cookieParser())
    //读取客户端发回的cookie
    console.log(req.cookies);
    res.send("hello")
})

app.post("/login",(req,res)=>{
    /*
        http是一个无状态协议，服务器无法区分请求是否发送自同一个客户端
        cookie是http协议中用来解决无状态问题的一个技术
        cookie本质就是一个头，服务器以响应头的形式把cookie发送给客户端
        客户端收到以后会将其存储，并再下次向服务器发送请求时将其传回
        这样服务器就可以识别客户端了
    */
    //获取用户名和密码
    const {username,password} = req.body
    
    if(username == "admin" && password == "123123") {
        //可以将用户名放入session
        //这里只是存储到内存中，并没有写到文件里
        req.session.username = username
        //立刻写到文件里，存储完后会执行回调函数
        req.session.save(()=>{
            res.redirect("/students")
        })
        
    } else {
        res.send("用户名或密码错误")
    }
})



app.get("/students",(req,res)=>{
    //希望用户在访问student路由时，可以给用户返回一个有学生信息的网页
    /*
        希望有这么一个东西，它长得像网页，但是它里面可以嵌入变量
        在node中叫模板
        在node中存在有很多模板引擎
        ejs是node中的一款模板引擎
            1、安装ejs
            2、配置express模板引擎为ejs
            注意，模板引擎需要被express渲染后用户才能使用
    */
   //res.render() 渲染一个模板引擎并返回给浏览器
   //可以将一个对象作为render的第二个参数，这样在模板中可以访问到对象中的数据
   //<%=%>在ejs输出内容时，会自动对特殊字符进行转义
   //这个设计主要为了避免xss攻击
   //<%-%>也可以输出，不会对特殊字符进行转义
   //<% %>可以在其中直接编写js代码，代码会在服务器中执行
   
   if(req.session.username == "admin") {
    res.render("students",{
        stus:STUDENT_ARR
       })
   } else {
    res.redirect("/")
   }
})

app.use((req,res,next)=>{
    if(req.session.username == "admin") {
        res.render("students",{
            stus:STUDENT_ARR
           })
           next()
       } else {
        res.redirect("/")
       }
})

app.get("/to-update",(req,res)=>{
    //获取要修改的学生的信息
    const id = +req.query.id
    const student = STUDENT_ARR.find(item =>item.id === id)
    res.render("update",{
        student
    })
})

app.post("/update-student",(req,res)=>{
    const id = +req.query.id
        //修改学生信息，根据学生id获取学生对象
    const {name,age,gender,address} = req.body
    const student = STUDENT_ARR.find(item =>item.id === id)
    student.name = name
    student.age = age
    student.gender = gender
    student.address = address

    fs.writeFile(path.resolve(__dirname,"./data/students.json"),JSON.stringify(STUDENT_ARR))
.then(()=>{
    res.redirect("/students")
}).catch(()=>{

})

})

app.get("/delete",(req,res)=>{
    //获取要删除的学生的id
    const id = req.query.id
    //根据id删除学生
    STUDENT_ARR = STUDENT_ARR.filter(stu=>stu.id != id)
    //将新的数组写入到文件中
    fs.writeFile(path.resolve(__dirname,"./data/students.json"),JSON.stringify(STUDENT_ARR))
.then(()=>{
    res.redirect("/students")
}).catch(()=>{

})
})

//创建一个添加学生信息的路由
app.post("/add-stu",(req,res)=>{
    //1.获取用户填写的信息
    //生成id
    
        const id = STUDENT_ARR.at(-1)?STUDENT_ARR.at(-1).id + 1:1
    
    //at就是根据索引到数组取元素，-1表示倒数第一个
    const newUser = {
        id,
        name:req.body.name,
        age:+req.body.age,
        gender:req.body.gender,
        address:req.body.address
    }
    //2.验证用户信息，略
    //3.将用户信息添加到数组中
    STUDENT_ARR.push(newUser)

    //将新数据写入json文件
    fs.writeFile(path.resolve(__dirname,"./data/students.json"),JSON.stringify(STUDENT_ARR))
.then(()=>{
    //4.返回响应
    //直接在添加路由中渲染ejs，会有表单重复提交问题
    // res.render("students",{stus:STUDENT_ARR})

    //res.redirect() 用来发起重定向请求
    //让浏览器向另外一个地址再发起一个请求
    res.redirect("/students")
}).catch(()=>{

})
    
})

//可以在所有路由的后面配置错误路由
app.use((req,res) => {
    //只要这个中间件执行，说明上面的地址都没有匹配
    res.status(404)
    res.send("访问的地址被外星人劫持")
})

app.listen(3000,() => {
    console.log("服务器已启动")
})