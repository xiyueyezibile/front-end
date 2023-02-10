import React, { useEffect, useState } from "react";
import classes from './Login.module.css'
const Login = (props) => {
  let [login,setLogin] = useState()
  let [change,setChange] = useState(0)
  let [register,setRegister] = useState()
  let [user,setUser] = useState(undefined)
  let [send,setSend] = useState()
  useEffect(()=>{
    if(props.token) {
      change = 2
      let newuser = {
        img:localStorage.getItem('img'),
        username:localStorage.getItem('username')
      }
      setUser(newuser)
      setChange(change)
    }
  })
  //双向绑定
  const loginChange = (e) =>{
    login = e.target.value
    setLogin(login)
  }
  const registerChange = (e) => {
    register = e.target.value
    setRegister(register)
  }
  //提交登录
  const clickLogin = async () => {
    const res = await fetch('http://runninglili.club:8080/login',{
      method:'post',
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
    body:`username=${login}`
    })
    const data = await res.json()
    if(data.code == 200) {
      localStorage.setItem('token',data.token)
      localStorage.setItem('username',data.data.username)
      localStorage.setItem('img',data.data.avatar)
      console.log(data.data);
      let newuser = {
        img:data.data.avatar,
        username:data.data.username
      }
      //登录了
      change = 2
      props.logins()
      setUser(newuser)
      setChange(change)
    }
  }
  //双向绑定
  const textChange = (e) => {
    send = e.target.value
    console.log(send);
    setSend(send)
  }
  //发送留言
  const onSend = async () => {
    console.log(send);
    let res = await fetch('http://runninglili.club:8080/sendMes',{
      method:'post',
      headers:{
        'Authorization':localStorage.getItem('token'),
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body:`words=${send}`
    })
    let data = await res.json()
    console.log(data);
    if(data.code == 200) {
      setSend(null)
      props.newSend()
    }
  }
  //提交注册
  const clickRegister = async () => {
    let res = await fetch('http://runninglili.club:8080/register',{
      method:'post',
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
    body:`username=${register}`
    })
    let data = await res.json()
    console.log(data);
    if(data.code == 200) {
      login = register
      clickLogin()
    }
  }
  //注册登录界面跳转
  const changeLogin = () => {
    //1登录界面，0注册界面
    if(change == 0) {
      change = 1
    setChange(change)
    } else {
      change = 0
      setChange(change)
    }
  }
  //0登录，1注册，2登录成功后
    let changeDiv = [<div className={classes.loginbox}>
      <div className={classes.form}>
        登录:<input type="text" value={login} onChange={loginChange} className={classes.username} placeholder="请输入用户名" />
      </div>
      <div className={classes.goto} onClick={changeLogin}>
        没有账号？前往注册
      </div>
      <div>
        <button className={classes.btn} onClick={clickLogin}>登录</button>
      </div>
    </div>,<div className={classes.loginbox}>
      <div className={classes.form}>
        注册:<input type="text" value={register} onChange={registerChange} className={classes.username} placeholder="请输入用户名" />
      </div>
      <div className={classes.goto} onClick={changeLogin}>
        已有账号？前往登录
      </div>
      <div>
        <button className={classes.btn} onClick={clickRegister}>注册</button>
      </div>
    </div>,<div className={classes.loginbox}>
      {user?user.username:undefined}
      <div className={classes.message}>
      <textarea placeholder="请输入你的留言..." value={send} onChange={textChange} className={classes.text} cols="30" rows="10"></textarea>
        </div>
        <button className={classes.send} onClick={onSend} >发表留言</button>
      </div>]



  return <div className={classes.login}>
    <div className={classes.title}>
      蓝山の温暖小窝
    </div>
    {
      user?<img className={classes.img} src={user.img} alt="用户头像" />
      :<img className={classes.img} src="https://img-blog.csdnimg.cn/20210702092853313.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1c3RsZWF2ZWw=,size_16,color_FFFFFF,t_70" alt="用户头像" />
    }
    {
      changeDiv[change]
    }

  </div>
}

export default Login
