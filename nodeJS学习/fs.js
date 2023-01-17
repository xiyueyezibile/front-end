const fs = require("node:fs/promises")
const path = require("node:path")
fs.mkdir(path.resolve(__dirname,"./creatFS")).then(()=>{
    console.log("操作成功");
})