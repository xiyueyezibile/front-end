//创建数组
//1.字面量
let arr = []
//2.Array
let arr2 = new Array()//空数组
let arr3 = new Array(10)//长度为10的数组
let arr4 = new Array(10,1)//包含10，1的数组
//ES6新增
//Array.of( )方法总会创建一个包含所有传入参数的数组，而不管参数的数量与类型：
let arr5 = Array.of(1,2,3)
//Array.from( )方法将伪数组转化为真正的数组
function args(...arg) {
  console.log(arg);
  let m = Array.from(arg)
  console.log(m);
  console.log(arg);
}
args(1,2,3)
//join( )方法把数组转化为字符串，默认逗号作为分隔符
let arr6 = [1,2,3]
let str = arr6.join('-')
console.log(str);
// push()方法从数组末尾向数组添加元素，可以添加一个或多个元素,并返回新的长度
// pop()方法用于删除数组的最后一个元素并返回删除的元素
let arr7 = []
let arr7l =  arr7.push('nihao')//返回长度
console.log(arr7l);
let arr8 = arr7.pop()//返回删除元素
console.log(arr8);
// unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度
// shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
let arr9 = []
let arr9l = arr9.unshift(1,2,3)//返回长度
console.log(arr9l);
let arr10 = arr9.shift()//返回删除元素
console.log(arr10);
// slice()返回从原数组中指定开始下标到结束下标之间的项组成的新数组
// ，可以接受一或两个参数，即要返回项的起始和结束位置(不包括结束位置的项)
let arr11 = [1,2,3,4]
let arr12 = arr11.slice(1,3)
console.log(arr12);
// splice()可以实现删除、插入和替换
// 用法：array.splice(start,deleteCount,item...)
//                    开始位置，删除个数，替换元素
//实现删除
let arr13 = [1,2,3,4]
arr13.splice(0,1)
console.log(arr13);//[2,3,4]
//实现替换
arr13.splice(0,1,1)
console.log(arr13);//[1,3,4]
//实现插入
arr13.splice(1,0,2)//在起始位置前面插入
console.log(arr13);
//forEach( )方法
// forEach方法中的function回调有三个参数：
// 第一个参数是遍历的数组内容，
// 第二个参数是对应的数组索引，
// 第三个参数是数组本身
let arr14 = [1,2,3,4];
let sum =0;
arr14.forEach(function(value,index,array){

 array[index] == value; //结果为true

 sum+=value; 

 });

console.log(sum); //结果为 10
//map( )方法,返回一个新数组，会按照原始数组元素顺序依次处理元素
let array = [1, 2, 3, 4, 5];

let newArray = array.map((item) => {
    return item * item;//item为遍历的数组内容
})

console.log(newArray)  // [1, 4, 9, 16, 25]
//every() 判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true
//some() 判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true
let arr15 = [1,2,3,4]
let m = arr15.every(item => {
  //item为遍历数组的内容
  return item < 5
})
console.log(m);
let s = arr15.some(item =>{
  return item < 1
})
console.log(s);
//filter() 返回一个新数组，包括所有满足条件的数组元素,不改变原有数组
let arr16 = [1,2,3,4]
let arr17 = arr16.filter((item)=> {
  return item > 2
})
console.log('arr17',arr17);