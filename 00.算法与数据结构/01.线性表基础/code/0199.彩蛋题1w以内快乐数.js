let isHappy = n => {
  let pre = n;
  let cur = getNext(n);
  while (pre != cur && cur != 1) {
    pre = getNext(pre);
    cur = getNext(getNext(cur));
  }
  return cur == 1 ? n : 0;
};

let getNext = n => {
  let temp = 0;
  while (n) {
    temp += (n % 10) * (n % 10);
    n = Math.floor(n / 10);
  }
  return temp;
};

let res = 0
for(let i = 1; i <= 100000;i++){
  res += +isHappy(i) 
}
console.log('res',res);// 692159746

