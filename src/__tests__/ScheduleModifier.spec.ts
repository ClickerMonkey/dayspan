// import { describe, it, expect } from 'jest';
import { ScheduleModifier } from '../ScheduleModifier';
import { Time } from '../Time';
import { Day } from '../Day';
import { Identifier } from '../Identifier';


describe('ScheduleModifier', () =>
{

  let d0 = Day.fromArray([2017, 2, 11, 8, 30]);
  let d1 = Day.fromArray([2014, 5, 15, 16, 23]);

  let t0 = Time.parse('08:30');
  let t1 = Time.parse('09:45');

  it('moveTime', () =>
  {
    let mod = new ScheduleModifier<boolean>();

    mod.set( d0, true, Identifier.Time );
    mod.set( d1, true, Identifier.Time );

    expect( mod.get( d0, false ) ).toBe( true );
    expect( mod.map[ '201406151623'] ).toBe( true );
    expect( mod.map[ '201703110830'] ).toBe( true );
    expect( mod.map[ '201703110945'] ).toBe( undefined );

    mod.moveTime( t0, t1 );

    expect( mod.get( d0, false ) ).toBe( false );
    expect( mod.map[ '201406151623'] ).toBe( true );
    expect( mod.map[ '201703110830'] ).toBe( undefined );
    expect( mod.map[ '201703110945'] ).toBe( true );
  })

  it('get time first', () =>
  {
    let mod = new ScheduleModifier<number>();

    mod.set( d0, 1, Identifier.Time );
    mod.set( d0, 2, Identifier.Day );

    expect( mod.get( d0, 3 ) ).toBe( 1 );
    expect( mod.get( d1, 3 ) ).toBe( 3 );
  })

  it('get all day', () =>
  {
    let mod = new ScheduleModifier<number>();

    mod.set( d0, 1, Identifier.Time );
    mod.set( d0, 2, Identifier.Day );

    expect( mod.getAll( d0 ) ).toEqual( [1, 2] );
  })

})
