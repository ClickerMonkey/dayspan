// import { describe, it, expect } from 'jest';
import { Iterator } from '../Iterator';


describe('Iterator', () => {

  it('remove', () =>
  {
    let a: number[] = [1, 2, 3, 4];

    Iterator.forArray( a )
      .iterate((n, iterator) => {
        if (n % 2 === 0) {
          iterator.remove();
        }
      })
    ;

    expect( a ).toEqual( [1, 3] );
  })

  it('isEmpty', () =>
  {
    expect( Iterator.forArray<number>( [] ).isEmpty() ).toBeTruthy();
    expect( Iterator.forArray( [1, 2] ).isEmpty() ).toBeFalsy();
    expect( Iterator.forObject<number>( {} ).isEmpty() ).toBeTruthy();
    expect( Iterator.forObject( {x: 2} ).isEmpty() ).toBeFalsy();
  })


  it('isEmpty filtered', () =>
  {
    let isEven = (x: number) => x % 2 === 0;

    expect( Iterator.forArray<number>( [] ).isEmpty( isEven ) ).toBeTruthy();
    expect( Iterator.forArray( [1, 3] ).isEmpty( isEven ) ).toBeTruthy();
    expect( Iterator.forArray( [1, 2] ).isEmpty( isEven ) ).toBeFalsy();
    expect( Iterator.forObject<number>( {} ).isEmpty( isEven ) ).toBeTruthy();
    expect( Iterator.forObject( {x: 1} ).isEmpty( isEven ) ).toBeTruthy();
    expect( Iterator.forObject( {x: 1, y: 2} ).isEmpty( isEven ) ).toBeFalsy();
    expect( Iterator.forObject( {x: 1, y: 3} ).isEmpty( isEven ) ).toBeTruthy();
  })

  it('reverse', () =>
  {
    let a: number[] = [1, 2, 3, 4];
    let out: number[] = Iterator.forArray( a ).reverse().list();

    expect( out ).toEqual( [4, 3, 2, 1] );
  })

  it('reduce', () =>
  {
    let a: number[] = [1, 2, 3, 4, 5];
    let sum: number = Iterator.forArray( a ).reduce( 0, (item, current) => current + item );

    expect( sum ).toBe( 15 );
  })

  it('filter', () =>
  {
    let a: number[] = [1, 2, 3, 4];
    let isEven = (x: number) => x % 2 === 0;
    let even: number[] = Iterator.forArray( a ).filter( isEven ).list();

    expect( even ).toEqual( [2, 4] );
  })

  it('map', () =>
  {
    let a: number[] = [1, 2, 3, 4];
    let mapped: string[] = Iterator.forArray( a )
      .map<string>(item => 'x' + item)
      .list();

    expect( mapped ).toEqual( ['x1', 'x2', 'x3', 'x4'] );
  })

  it('join', () =>
  {
    let a: number[] = [1, 2, 3];
    let b = {x: 4, y: 5, z: 6};
    let c: number[] = Iterator.join( Iterator.forArray( a ), Iterator.forObject( b ) ).list();

    expect( c ).toEqual( [1, 2, 3, 4, 5, 6] );
  })

  it('skip', () =>
  {
    let a: number[] = [1, 2, 3, 4, 5];
    let b: number[] = Iterator.forArray( a ).skip( 2 ).list();

    expect( b ).toEqual( [3, 4, 5] );
  })

  it('take', () =>
  {
    let a: number[] = [1, 2, 3, 4];
    let b: number[] = Iterator.forArray( a ).take( 3 ).list();

    expect( b ).toEqual( [1, 2, 3] );
  })

  it('skip take', () =>
  {
    let a: number[] = [1, 2, 3, 4, 5, 6];
    let b: number[] = Iterator.forArray( a ).skip( 2 ).take( 2 ).list();

    expect( b ).toEqual( [3, 4] );
  })

})
