import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'
import Login from '@/components/Login'
import Content from '@/components/Content'



export default function Home({data}) {
  let [login,setLogin] = useState(0)
  let [loginFlag,setLoginFlag] = useState(0)
  let [token,setToken] = useState(0)
  let [datas,setDatas] = useState(data.map((item,index) => <Content key={index} avatar={item.avatar} username={item.username} words={item.words} />))
  useEffect(()=>{
    if(localStorage.getItem('token')) {
      loginFlag = 1
      setLoginFlag(loginFlag)
      login = 1
      setLogin(login)
      token = 1
      setToken(token)
    }
  },[])
  const mouseEnter = (e)=>{
    if(!loginFlag) {
      loginFlag = 1
    setLoginFlag(loginFlag)
    }
  }
  const mouseLeave = (e) => {
   if(loginFlag) {
    loginFlag = 0
    setLoginFlag(loginFlag)
   }
  }
  const onLogin = () =>{
    login = 1
    setLogin(login)
  }
  const addSend =  async () => {
    let res = await fetch('http://runninglili.club:8080/getAllMessages')
  let newdata = await res.json()
 let  newdatas = newdata.map((item,index) => <Content key={index} avatar={item.avatar} username={item.username} words={item.words} />)
  setDatas(newdatas)
}
  
  return (
    <>
      <Head>
        <title>蓝山の温暖小窝</title>
      </Head>
      <main className={styles.main}>
      <div className={loginFlag?styles.loginSelect:styles.login} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter}>
        <Login newSend={addSend} token={token} logins={onLogin} />
      </div>
      <div className={styles.move}></div>
      <div className={styles.content}>
        <ul className={styles.ul}>
        {
          login?datas:undefined
        }
        </ul>
      </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  let res = await fetch('http://runninglili.club:8080/getAllMessages')
  let data = await res.json()
  return {
    props:{data}
  }
}