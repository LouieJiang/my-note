// 节点+指针 实现链表
// TODO 实现完整的查找插入删除
function ListNode(val){
    this.val = val;
    this.next = null;
}

function main(){
  const head = new ListNode(1);
  head.next = new ListNode(2);
  head.next.next = new ListNode(3);
  head.next.next.next = new ListNode(4);
  let p = head;
  while (p != null) {
    console.log(p.val);
    p = p.next;
  }
}

main()