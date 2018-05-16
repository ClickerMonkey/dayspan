
export enum Op
{
  NONE,
  FLOOR,
  CEIL,
  ROUND,
  TRUNCATE,
  UP,
  DOWN
}

export function operate(value: number, op: Op, absolute: boolean = false)
{
  if (isFinite(value))
  {
    if (absolute)
    {
      value = Math.abs( value );
    }

    switch (op)
    {
    case Op.NONE:
      return value;
    case Op.FLOOR:
      return Math.floor( value );
    case Op.CEIL:
      return Math.ceil( value );
    case Op.ROUND:
      return Math.round( value );
    case Op.TRUNCATE:
    case Op.DOWN:
      return value < 0 ? Math.ceil( value ) : Math.floor( value );
    case Op.UP:
      return value < 0 ? Math.floor( value ) : Math.ceil( value );
    }
  }

  return value;
}
