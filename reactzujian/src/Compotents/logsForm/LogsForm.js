import { useState } from "react";
import Card from "../UI/Card/Card";
import "./LogsForm.css"
const LogsForm = (props) => {
  // 当表单项发生变化时获取用户输入的内容
  //创建一个响应函数监听日期的变化

  //创建变量存储表单中的数据
  // let inputDate = ''
  // let inputDesc = ''
  // let inputTime = ''
  //优化
  // const [inputDate,setInputDate] = useState('')
  // const [inputDesc,setInputDesc] = useState('')
  // const [inputTime,setInputTime] = useState('')
  //将表单数据统一到一个对象中
  const [formData,setFormData] = useState({
    inputDate:'',
    inputDesc:'',
    inputTime:''
  })

  const dateChangeHandler = (e) => {
    // console.log(e.target.value);
    setFormData({
      ...formData,
      inputDate:e.target.value
    })
  }
  //创建一个响应函数监听表单的变化
  const descChangeHandler = (e) => {
    //获取当前触发事件的对象
    //事件对象中保存了当前事件触发时的所有信息
    //e.target返回触发事件的对象（DOM对象）
    // console.log(e.target.value);
    setFormData({
      ...formData,
      inputDesc:e.target.value
    })
  }
  //创建一个响应函数监听时长的变化
  const timeChangeHandler = (e) => {
    // console.log(e.target.value);
    setFormData({
      ...formData,
      inputTime:e.target.value
    })
  }
  //表单提交时，汇总表单中的数据
  const formSubmitHandler = (e) => {
    //取消默认行为
    e.preventDefault()
    //获取表单项中的数据日期,内容,时长
    //拼装为一个对象
    const newLog = {
      date:new Date(formData.inputDate),
      desc:formData.inputDesc,
      time:+formData.inputTime
    }
    //当添加新的日志时，调用父组件传递过来的函数
    props.onSaveLog(newLog)
    //提交表单后如何清空旧数据
    //清空表单项
    setFormData({
      inputDate:'',
      inputDesc:'',
      inputTime:''
    })
  }
  return <Card className="logs-form">
    <form onSubmit={formSubmitHandler}>
      <div className="form-item">
        <label htmlFor="date">日期:</label>
      <input id="date" type="date" onChange={dateChangeHandler} value={formData.inputDate} />
      </div>
      <div className="form-item">
        <label htmlFor="desc">内容:</label>
      <input id="desc" type="text" onChange={descChangeHandler} value={formData.inputDesc} />
      </div>
      <div className="form-item">
        <label htmlFor="time">时长:</label>
      <input id="time" type="number" onChange={timeChangeHandler} value={formData.inputTime} />
      </div>
      <div className="form-btn">
      <button>添加</button>
      </div>
    </form>
  </Card>
}

export default LogsForm