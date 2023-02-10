import React from "react";
import classes from './Content.module.css'
const Content = ({avatar,username,words}) => {
  return <li className={classes.li}>
    <img className={classes.img} src={avatar} alt={username} />
    <div className={classes.content}>
      <div className={classes.username}>
        {
          username
        }
      </div>
      <div className={classes.words}>
        {
          words
        }
      </div>
    </div>
  </li>
}
export default Content