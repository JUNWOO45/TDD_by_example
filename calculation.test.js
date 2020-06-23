class Dollar {
  constructor(amount) {
    this.amount = amount;
  }

  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
}

test('multiply test', () => {
  const five = new Dollar(5);
  const product1 = five.times(2);
  expect(product1.amount).toBe(10);
  expect(product1.times(5).amount).toBe(50);
  
  const product2 = five.times(5);
  expect(product2.amount).toBe(25);
});
