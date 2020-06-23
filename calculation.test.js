class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  equals(instance) {
    return this.amount === instance.amount && this.getCurrency() === instance.currency;
  }

  dollar(amount) {
    return new Dollar(amount, 'USD');
  }

  franc(amount) {
    return new Franc(amount, 'CHF');
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }

  getCurrency() {
    return this.currency;
  }
}

class Dollar extends Money{
  constructor(amount, currency = 'USD') {
    super(amount, currency);
  }
}

class Franc extends Money{
  constructor(amount, currency = 'CHF') {
    super(amount, currency);
  }
}

// 테스트 케이스
test('Franc class test', () => {
  const five = new Money().franc(5);
  const money = new Money();

  expect(five.times(2).amount).toBe(money.franc(10).amount);
  expect(five.times(3).amount).toBe(money.franc(15).amount);
})

test('Dollay class test', () => {
  const five = new Money().dollar(5);
  const money = new Money();

  expect(five.times(2).amount).toBe(money.dollar(10).amount);
  expect(five.times(5).amount).toBe(money.dollar(25).amount);
});

test('test equality', () => {
  const money = new Money();

  const ex1 = money.dollar(5).equals(money.dollar(5));
  const ex2 = money.dollar(5).equals(money.dollar(6));

  expect(ex1).toBeTruthy();
  expect(ex2).toBeFalsy();

  const ex3 = money.franc(7).equals(money.franc(7));
  const ex4 = money.franc(7).equals(money.franc(8));

  expect(ex3).toBeTruthy();
  expect(ex4).toBeFalsy();

  const ex5 = (money.franc(5)).equals(money.dollar(5));
  // expect(ex5).toBeFalsy(); //실패한다. Dollar는 Franc라는 소리.
  // expect(ex5).toBeTruthy(); // currency가 생기면서 Dollar !== Franc 가 되어야한다. 이제 toBeFalsy다.
  expect(ex5).toBeFalsy();
});


test('multiplication test', () => {
  const money = new Money();
  const { amount } = money.dollar(10);

  expect(amount).toBe(money.dollar(5).times(2).amount);
  expect(amount).toBe(new Money(5).times(2).amount);
  expect(amount).toBe(money.dollar(20).times(0.5).amount);
  expect(amount).toBe(new Money(20).times(0.5).amount);
});

test('Currency test', () => {
  const money = new Money();
  
  expect('USD').toBe(money.dollar(1).getCurrency());
  expect('CHF').toBe(money.franc(1).getCurrency());
});
