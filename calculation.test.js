class Money {
  constructor(amount) {
    this.amount = amount;
  }

  equals(instance) {
    return this.amount === instance.amount;
  }
}

class Dollar extends Money{
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
}

class Franc extends Money{
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
}

// 테스트 케이스
test('Franc class test', () => {
  const five = new Franc(5);
  expect(five.times(2).amount).toBe(new Franc(10).amount);
  expect(five.times(3).amount).toBe(new Franc(15).amount);
})

test('Dollay class test', () => {
  const five = new Dollar(5);
  expect(five.times(2).amount).toBe((new Dollar(10)).amount);
  expect(five.times(5).amount).toBe((new Dollar(25)).amount);
});

test('test equality', () => {
  const ex1 = new Dollar(5).equals(new Dollar(5));
  const ex2 = new Dollar(5).equals(new Dollar(6));

  expect(ex1).toBeTruthy();
  expect(ex2).toBeFalsy();

  const ex3 = new Franc(7).equals(new Franc(7));
  const ex4 = new Franc(7).equals(new Franc(8));

  expect(ex3).toBeTruthy();
  expect(ex4).toBeFalsy();
})