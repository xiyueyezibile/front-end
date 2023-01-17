//手写call方法
Function.prototype.myCall = function (obj,...rest) {
  //判断是否为null或undefined
  //call第一个参数为这些时指向全局对象
  if(obj == undefined || obj == null) {
    obj = window
  }
  obj.fng = this//谁调用this，this就指向谁
  let result = obj.fng(...rest)//立即执行
  delete obj.fng//删除防止越来越多
  return result//返回执行的结果
}
let obj = {
  name:"一个"
}
function fng(a,b) {
  console.log('我是' + this.name + a + b);
}
fng.myCall(obj,"好","前端")

//手写apply方法
Function.prototype.myApply = function (obj,arr) {
  //判断是否为null或undefined
  //apply第一个参数为这些时指向全局对象
  if(obj == undefined || obj == null) {
    obj = window
  }
  obj.fng = this//谁调用this指向谁
  let result = obj.fng(...arr)//立即执行函数
  delete obj.fng//删除防止越来越多
  return result
}
fng.myApply(obj,["牛逼的","前端"])

//手写bind方法
Function.prototype.myBind = function (obj,...rest) {
  //判断是否为null或undefined
  //bind第一个参数为这些时指向全局对象
  if(obj == undefined || obj == null) {
    obj = window
  }
  let _this = this//谁调用this指向谁
  //1.返回一个函数，不会立即执行
  //2.函数的返回值里面调用call方法，当调用时就会执行更改this指向
  return function (...otherrest) {
    return _this.call(obj,...rest,...otherrest)//执行时改变其this指向
  }
}
let s = fng.myBind(obj,"厉害的")
s("前端")

/*
  总结：call方法和bind方法非常相似，在Function上定义方法不要用箭头函数
        箭头函数导致this指向不会变，手写实现this指向改变都是把调用函数
        变成改变this指向的对象下面的一个方法，然后在删除
        而bind较不一样，要返回一个改变this指向的函数，通过前两种方法设置
        返回函数的返回值this指向改变去实现bind方法
*/