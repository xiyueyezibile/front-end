//使用RTK构建store
import {configureStore, createSlice} from "@reduxjs/toolkit"
//createSlice 创建reducer的切片
//需要一个配置对象作为参数，通过对象不同的属性来指定它的配置信息
const stuSlice = createSlice({
  name:'stu',//用来自动生成action中的type
  initialState:{
    name:'孙悟空',
    age:18,
    gender:'男'
  },//当前切片的state的初始值
  reducers:{//指定state的各种操作,可以直接在对象中添加方法
    setName(state,action) {
      //每一个方法中可以通过不同的方法指定对state的不同操作
      //两个参数：state是一个代理对象，可以直接修改
      state.name = '猪八戒'
    }
  }
})

//切片对象会自动的帮助我们生成action
//stuSlice.actions存储action，打印它可以看见{setName}
//actions中存储是slice自动生成的action函数，调用会自动创建action对象
//action对象的结构{type:name/函数名,payload:函数的参数}
export const {setName} = stuSlice.actions

//创建store,需要一个配置对象
const store = configureStore({
  reducer: {
    stu: stuSlice.reducer
  }
})

export default store