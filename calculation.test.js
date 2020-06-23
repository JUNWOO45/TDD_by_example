class Dollar {
  constructor(amount) {
    this.amount = amount;
  }

  times(multiplier) {
    this.amount *= multiplier;
  }
}

test('multiply test', () => {
  const dollar = new Dollar(5);
  dollar.times(2)
  
  expect(dollar.amount).toBe(10);
});
