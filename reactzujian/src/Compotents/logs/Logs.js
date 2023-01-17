//日志容器
import "./Logs.css"
import LogItem from "./LogItem"
import Card from "../UI/Card/Card"
const Logs = (props) => {
  
  
  //创建数据格式
  let logItemData = props.logsData.map((item,index) => <LogItem onDelLog={()=>props.onDelLog(index)} key={item.id} date={item.date} desc={item.desc} time={item.time} />)
  let filterData = props.logsData.filter(item => item.date.getFullYear() == 2021)
  console.log('filterData',filterData);
  return <Card className="logs">
    {logItemData.length?logItemData: <p className="no-logs">列表中没有找到日志</p>}
    </Card>
}
export default Logs