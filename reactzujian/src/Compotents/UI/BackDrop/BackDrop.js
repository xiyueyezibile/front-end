import React from "react";
import "./BackDrop.css"
import  ReactDOM  from "react-dom";
//获取backDrop的根元素
const backDropRoot = document.getElementById('backdrop-root')
const BackDrop = props => {
  return ReactDOM.createPortal(
    <div className="backDrop">
    {props.children}
  </div>,backDropRoot
  )
}

export default BackDrop