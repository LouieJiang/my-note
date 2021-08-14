// 数组实现链表
// TODO 实现完整的查找插入删除

const data = []
const next = []
/**
 * 在index节点后面添加节点p，节点p里的值为val
 * @param {*} index 下标
 * @param {*} p 指针
 * @param {*} val 数值
 */
function add(index, p, val) {
  next[p] = next[index] // 不然在中间插入时会丢掉后面代码
  next[index] = p;
  data[p] = val
}

function main() {
  const head = 3;
  data[3] = 0;
  add(3, 5, 1);
  add(5, 2, 2);
  add(2, 7, 3);
  add(7, 9, 100);
  add(5, 6, 123); // 中间插入
  let p = head;
  console.log('head.nest');
  
  while (p != null) {
    console.log(data[p]);
    p = next[p]
  }
}
main()
h
console.log('data',data);
console.log('next',next);
