const fib = require('./fibonacci');

test('test fib', () => {
  const testList = [[0,0], [1,1]];

  testList.forEach(arr => {
    expect(fib(arr[0])).toBe(arr[1]);
  })
});
