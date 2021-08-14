test("Hello world", ()=>{
  const text = require("../index")
  // console.log('text','hello world');
  expect(text)
    .toBe('hello world')
})