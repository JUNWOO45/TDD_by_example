class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  equals(instance) {
    return this.amount === instance.amount && this.getCurrency() === instance.currency;
  }

  dollar(amount) {
    return new Money(amount, 'USD');
  }

  franc(amount) {
    return new Money(amount, 'CHF');
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }

  getCurrency() {
    return this.currency;
  }

  plus(add) {
    return new Sum(this.amount, add.amount)
  }

  reduce(amount, to) {
    const rate = this.currency === 'CHF' && to === 'USD' ? 2 : 1;

    return new Money(amount / rate, to);
    // if (this.currency === to) {
    //   return this;
    // }

    // const rate = bank.rate(this.currency, to);
    // return new Money(this.amount / rate, to);
  }
}

class Bank {
  constructor() {
    this.rates = {};
  }

  reduce(source, to) {
    return source.reduce(source.amount, to);
  }

  rate(from, to) {
    if(from === to) {
      return 1;
    }

    console.log('this.rates ::: ', this.rates);
    return this.rates[from+'-'+to];
  }

  addRate(from, to, rate) {
    this.rates[from+'-'+to] = rate;
  }
}

class Sum {
  constructor(augend, addend) {
    this.augend = augend;
    this.addend = addend;
    this.amount = this.augend + this.addend;
  }

  // 여기 리팩토링 가능하겠다. 바로 this.amount 써먹으면 되겟다.

  reduce(to) {
    return new Money(this.amount, to);
  }
}

class Pair {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  equals(obj) {
    const pair = obj;
    return this.from === pair.from && this.to === pair.to;
  }

  hashcode() {
    return 0;
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

test('equality TEST', () => {
  const money = new Money();

  const ex1 = money.dollar(5).equals(money.dollar(5));
  const ex2 = money.dollar(5).equals(money.dollar(6));
  expect(ex1).toBeTruthy();
  expect(ex2).toBeFalsy();

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

test('SIMPLE Addition TEST', () => {
  const money = new Money();
  const five = money.dollar(5);
  // const sum = five.plus(five);
  const sum = new Sum(money.dollar(5).amount, money.dollar(5).amount);

  const bank = new Bank();
  const reduced = bank.reduce(sum, 'USD');

  expect(money.dollar(10).amount).toBe(reduced.amount);
});

test('Plus Returns Sum', () => {
  const money = new Money();
  const five = money.dollar(5);
  const sum = five.plus(five);

  expect(five.amount).toBe(sum.augend);
  expect(five.amount).toBe(sum.addend);
});

test('Reduce Sum test', () => {
  const money = new Money();
  const sum = new Sum(money.dollar(3).amount, money.dollar(4).amount);

  const bank = new Bank();
  const reduced = bank.reduce(sum, 'USD');

  expect(money.dollar(7).amount).toBe(reduced.amount);
});

test('Reduce Money test', () => {
  const bank = new Bank();
  const result = bank.reduce(new Money().dollar(1), 'USD');

  expect(new Money().dollar(1).amount).toBe(result.amount);
});

test('Reduce money different currency', () => {
  const bank = new Bank();
  bank.addRate('CHF', 'USD', 2);
  const result = bank.reduce(new Money().franc(2), 'USD');

  expect(new Money().dollar(1).amount).toBe(result.amount)
});
