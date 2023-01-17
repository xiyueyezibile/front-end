import MyDate from "./MyDate"
import "./LogItem.css"
import Card from "../UI/Card/Card";
import { useState } from "react";
import ConfirmModal from "../UI/ConfirmModal/ConfirmModal";
const LogItem = (props) => {
  //添加一个state记录是否显示确认窗口
  const [showConfirm,setShowConfirm] = useState(false)
  //取消函数
  const cancelHandler = () => {
    setShowConfirm(false)
  }
  //确认函数
  const okHandler = () => {
    props.onDelLog()
  }
  const deleteItemHandler = () => {
   //显示确认窗口
   setShowConfirm(true)

  }
  /*
  portal
    组件默认会作为父组件的后代渲染到页面中
    有些情况下这种方式会带来一些问题
    通过portal可以渲染到页面中的指定位置
    使用方法
    在index.html加一个新的元素
    修改组件的渲染方式
    通过ReactDOM.createPortal()作为返回值创建元素
    第一个参数jsx（修改前return后的代码）
    第二个参数目标位置(DOM元素)
  */

  // console.log(props);
  // 可以在函数组件的形参中定义props，它是一个对象，它包含父组件中传递的所有参数
  return <Card className="item">
    {showConfirm && <ConfirmModal confirmText="该操作不可恢复！请确认" onOk={okHandler} onCancel={cancelHandler} />}
    <MyDate date={props.date} />
    {/* 日志内容的容器 */}
    {/* 在函数组件中，属性相当于函数的参数 */}
    <div className='content'>
    <h2 className="desc">{props.desc}</h2>
    <div className="time">{props.time}</div>
    </div>
    {/* 添加一个删除的按钮 */}
    <div>
      <div className="delete" onClick={deleteItemHandler} >
        x
      </div>
    </div>
  </Card>
}
export default LogItem