require("process")
const path = require("path")
const fs = require("fs/promises")

fs.appendFile(path.resolve(__dirname,"./fs创建的.js"),"我是被m5中fs创建的")



// const buf = fs.readFile(path.resolve(__dirname,"./m2.js")).then(()=>{
//     console.log(buf.toString());
// },()=>{
//     console.log('出错了');
// })


// ;(async () => {
//     try{
// const buf = await fs.readFile(path.resolve(__dirname,"./m2.js"))
// console.log(buf.toString());
//     }catch (e) {
//         console.log(e);
//     }
// })()


// console.log(path);
// const a = path.resolve()
// console.log(a);
// const b = path.resolve(__dirname,"./m5.js")
// console.log(b);

// setTimeout(()=>{
//     console.log(1);
// })
// queueMicrotask(()=>{
//     console.log(2);
// })
// process.nextTick(()=>{
//     console.log(3);
// })
// console.log(4);


// console.log(111);
// process.exit()
// console.log(222);