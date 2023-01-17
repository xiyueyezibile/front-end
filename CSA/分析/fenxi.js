//异步，宏任务队列1
setTimeout(() => {
    console.log('setTimeout start');
    new Promise((resolve) => {
      console.log('promise1 start');
      resolve();
    }).then(() => {
      console.log('promise1 end');
    })
    console.log('setTimeout end');
  }, 0);
  function promise2() {
    return new Promise((resolve) => {
      console.log('promise2');
      resolve();
    })
  }
  async function async1() {
    console.log('async1 start');
    await promise2();
    console.log('async1 end');
  }
  async1();//栈1
  console.log('script end');//栈2
  /*
    先执行栈中代码，栈1中的同步代码打印async1 start，然后等待promise2()返回结果，后面的代码进入微任务队列，promise2()打印promise2
    ，此时栈1执行完毕，然后执行栈2，打印script end，此时栈执行完毕，先清空微任务队列，打印async1 end，
    然后执行宏任务1，依次打印同步的setTimeout start，promise1 start， setTimeout end，然后清空微任务队列，打印promise1 end。
  */