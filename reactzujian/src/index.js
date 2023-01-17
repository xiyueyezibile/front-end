import { render } from "react-dom"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import './index.css'
// //函数式组件
// function App() {
//   return <div>Hello React</div>
// }


const root = ReactDOM.createRoot(document.getElementById('root'))
//React组件可以直接通过JSX渲染
root.render(<App/>)