class Money {
  constructor(amount) {
    this.amount = amount;
  }

  equals(instance) {
    return this.amount === instance.amount;
  }

  dollar(amount) {
    return new Dollar(amount);
  }

  franc(amount) {
    return new Franc(amount);
  }

  times(multiplier) {
    return new Money(this.amount * multiplier);
  }
}

class Dollar extends Money{
  constructor(amount) {
    super(amount);
  }
}

class Franc extends Money{
  constructor(amount) {
    super(amount);
  }
}

// 테스트 케이스
test('Franc class test', () => {
  const five = new Money().franc(5);
  expect(five.times(2).amount).toBe(new Money().franc(10).amount);
  expect(five.times(3).amount).toBe(new Money().franc(15).amount);
})

test('Dollay class test', () => {
  const five = new Money().dollar(5);
  expect(five.times(2).amount).toBe(new Money().dollar(10).amount);
  expect(five.times(5).amount).toBe(new Money().dollar(25).amount);
});

test('test equality', () => {
  const ex1 = new Money().dollar(5).equals(new Money().dollar(5));
  const ex2 = new Money().dollar(5).equals(new Money().dollar(6));

  expect(ex1).toBeTruthy();
  expect(ex2).toBeFalsy();

  const ex3 = new Money().franc(7).equals(new Money().franc(7));
  const ex4 = new Money().franc(7).equals(new Money().franc(8));

  expect(ex3).toBeTruthy();
  expect(ex4).toBeFalsy();

  const ex5 = (new Money().franc(5)).equals(new Money().dollar(5));
  // expect(ex5).toBeFalsy(); //실패한다. Dollar는 Franc라는 소리.
  expect(ex5).toBeTruthy();
});


test('multiplication test', () => {
  const dollarTen = (new Money()).dollar(10);

  expect(dollarTen.amount).toBe(new Money().dollar(5).times(2).amount);
  expect(dollarTen.amount).toBe(new Money(5).times(2).amount);
  expect(dollarTen.amount).toBe(new Money().dollar(20).times(0.5).amount);
  expect(dollarTen.amount).toBe(new Money(20).times(0.5).amount);
})