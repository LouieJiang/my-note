function ListNode(val) {
  this.val = val;
  this.next = null;
}
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

function output(head) {
  if (!head) return process.stdout.write("null" + '\n');
  process.stdout.write(head.val + "->");
  output(head.next);
}

const reverseList = function (head, n) {
  if (n === 1) return head;
  let tail = head.next;
  let p = reverseList(head.next, n - 1);
  head.next = tail.next;
  tail.next = head;
  return p;
};

console.log("=======原始数组=======");
output(head);

console.log("=======翻转数组=======");
output(reverseList(head, 2));
