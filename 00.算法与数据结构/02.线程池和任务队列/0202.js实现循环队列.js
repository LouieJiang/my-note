/**
 * 0202.js实现循环队列
 */
class Queue {
    constructor(n = 10){
        this.head = 0; // 队首指针（下标）
        this.tail = 0; // 队尾指针（下标）
        this.arr = new Array(n); // 数组保存数据
        this.cout = 0; // 队列元素数量
    }
    // 入队
    push(x){
        if(this.full()){
            console.log('queue full');
        }else{
            this.arr[this.tail++] = x;
            this.cout++;
            this.tail === this.arr.length && (this.tail = 0);
        }
    }
    // 出队
    pop(){
        if(this.empty()){
            console.log('queue empty');
        }else{
            this.head++;
            this.head === this.arr.length && (this.head = 0);
            this.cout--
        }
    }
    // 判空
    empty(){
        return !this.size()
    }
    // 判满
    full(){
        return this.arr.length === this.size()
    }
    size(){
        return this.cout
    }
    // 查看队首元素
    front(){
        return this.arr[this.head]
    }
    // 清空
    clear(){
        this.head = 0;
        this.tail = 0;
        this.cout = 0;
    }
    output(){
        let res = ''
        for(let i = 0, j = this.head; i < this.cout; i++){
            res += ' ' + this.arr[j]
            j ++;
            if( j === this.cout) j = 0 ;
        }
        console.log('Queue:' + res);
    }
}

const queue = new Queue(2);

const loopReadline = require('../utils/loopReadline');

function readline(str){
    const arr = str.split(' ');
    const type = arr[0];
    const num = arr[1];
    // console.log({type,num});
    try {
        const res = queue[type](num)   
        console.log(`queue.${type}(${num}) =`, res); 
        queue.output()
    } catch (error) {
        // console.log(error);
        console.log('输入错误');
    }
    
}

loopReadline(readline)