// import { describe, it, expect } from 'jest';
import { Time } from '../Time';


describe('Time', () => {

  it('parse', () => {
    let t0: Time = Time.parse('04:45');
    let t1: Time = Time.parse('00:30');

    expect( t0.format('hh:mm a') ).toBe('04:45 am');
    expect( t1.format('hh:mm a') ).toBe('12:30 am');
  })

})
