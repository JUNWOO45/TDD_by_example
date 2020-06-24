const fib = require('./fibonacci');

test('test fib', () => {
  expect(fib(0)).toBe(0);
  expect(fib(1)).toBe(1);
});
