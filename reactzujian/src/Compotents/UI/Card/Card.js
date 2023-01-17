import React from "react";
import "./Card.css"
const Card = (props) => {
  // props.children 表示组件的标签体
  return <div className={"Card " + props.className}>{props.children}</div>
}

export default Card

