class Dollar {
  constructor(amount) {
    this.amount = amount;
  }

  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }

  equals(instance) {
    return this.amount === instance.amount;
  }
}

class Franc {
  constructor(amount) {
    this.amount = amount;
  }

  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }

  equals(instance) {
    return this.amount === instance.amount;
  }
}


// 테스트 케이스

test('Franc class test', () => {
  const five = new Franc(5);

  expect(new Franc(10).amount).toBe(five.times(2).amount);
  expect(new Franc(15).amount).toBe(five.times(3).amount);
})

test('multiply test', () => {
  const five = new Dollar(5);
  expect(five.times(2).amount).toBe((new Dollar(10)).amount);
  expect(five.times(5).amount).toBe((new Dollar(25)).amount);
});

test('test equality', () => {
  const five = new Dollar(5);
  const ex1 = five.equals(new Dollar(5))
  const ex2 = five.equals(new Dollar(6))

  expect(ex1).toBeTruthy();
  expect(ex2).toBeFalsy();
})