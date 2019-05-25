// import { describe, it, expect } from 'jest';

import { Day } from '../Day';

// tslint:disable: no-magic-numbers

describe('DayFormat', () => {

  it('month', () => {
    expect( Day.build(2018, 2, 3).format('M') ).toEqual('3');
    expect( Day.build(2018, 2, 3).format('Mo') ).toEqual('3rd');
    expect( Day.build(2018, 2, 3).format('MM') ).toEqual('03');
    expect( Day.build(2018, 2, 3).format('MMm') ).toEqual('Mr');
    expect( Day.build(2018, 2, 3).format('MMM') ).toEqual('Mar');
    expect( Day.build(2018, 2, 3).format('MMMm') ).toEqual('Mar');
    expect( Day.build(2018, 2, 3).format('MMMM') ).toEqual('March');
  })

  it('quarter', () => {
    expect( Day.build(2018, 2, 3).format('Q') ).toEqual('1');
    expect( Day.build(2018, 2, 3).format('Qo') ).toEqual('1st');
    expect( Day.build(2018, 3, 3).format('Q') ).toEqual('2');
    expect( Day.build(2018, 3, 3).format('Qo') ).toEqual('2nd');
    expect( Day.build(2018, 5, 3).format('Q') ).toEqual('2');
    expect( Day.build(2018, 5, 3).format('Qo') ).toEqual('2nd');
    expect( Day.build(2018, 6, 3).format('Q') ).toEqual('3');
    expect( Day.build(2018, 6, 3).format('Qo') ).toEqual('3rd');
  })

  it('dayOfMonth', () => {
    expect( Day.build(2018, 2, 3).format('D') ).toEqual('3');
    expect( Day.build(2018, 2, 3).format('Do') ).toEqual('3rd');
    expect( Day.build(2018, 3, 3).format('DD') ).toEqual('03');
  })

  it('day', () => {
    expect( Day.build(2018, 2, 3).format('d') ).toEqual('6');
    expect( Day.build(2018, 2, 3).format('do') ).toEqual('6th');
    expect( Day.build(2018, 2, 3).format('dd') ).toEqual('Sa');
    expect( Day.build(2018, 2, 3).format('ddd') ).toEqual('Sat');
    expect( Day.build(2018, 2, 3).format('dddd') ).toEqual('Saturday');
  })

  it('dayOfWeek', () => {
    expect( Day.build(2018, 2, 3).format('e') ).toEqual('6');
    expect( Day.build(2018, 2, 3).format('eo') ).toEqual('6th');
    expect( Day.build(2018, 2, 3).format('E') ).toEqual('7');
    expect( Day.build(2018, 2, 3).format('Eo') ).toEqual('7th');
  })

  it('week', () => {
    expect( Day.build(2018, 0, 1).format('w') ).toEqual('1');
    expect( Day.build(2018, 0, 6).format('w') ).toEqual('1');
    expect( Day.build(2018, 0, 7).format('w') ).toEqual('2');

    expect( Day.build(2017, 0, 1).format('w') ).toEqual('1');
    expect( Day.build(2017, 0, 7).format('w') ).toEqual('1');
    expect( Day.build(2017, 0, 8).format('w') ).toEqual('2');

    expect( Day.build(2016, 0, 1).format('w') ).toEqual('1');
    expect( Day.build(2016, 0, 2).format('w') ).toEqual('1');
    expect( Day.build(2016, 0, 3).format('w') ).toEqual('2');
  })

  it('weekOfYear', () => {
    expect( Day.build(2018, 0, 1).format('W') ).toEqual('1');
    expect( Day.build(2018, 0, 6).format('W') ).toEqual('1');
    expect( Day.build(2018, 0, 7).format('W') ).toEqual('2');

    expect( Day.build(2017, 0, 1).format('W') ).toEqual('1');
    expect( Day.build(2017, 0, 7).format('W') ).toEqual('1');
    expect( Day.build(2017, 0, 8).format('W') ).toEqual('2');

    expect( Day.build(2016, 0, 1).format('W') ).toEqual('0');
    expect( Day.build(2016, 0, 2).format('W') ).toEqual('0');
    expect( Day.build(2016, 0, 3).format('W') ).toEqual('1');
  })

  it('complicated', () => {
    expect( Day.build(2019, 4, 24, 22, 11, 33, 456)
      .format("MMYdddd[escaped] LT [more \\]escaped] 'and even''more'.") )
      .toEqual("052019Fridayescaped 10:11 PM more ]escaped and even'more.");
  })

})
