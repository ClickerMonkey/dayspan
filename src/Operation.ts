
/**
 * An operation that can be performed on a single number.
 */
export enum Op
{
  /**
   * The number is returned unmodified.
   */
  NONE,

  /**
   * The number is rounded down to the nearest whole number.
   */
  FLOOR,

  /**
   * The number is rounded up to the nearest whole number.
   */
  CEIL,

  /**
   * The number is rounded up or down depending on if the fractional value is
   * greater than or less than 0.5 respectively.
   */
  ROUND,

  /**
   * The fractional part of the number is dropped.
   */
  TRUNCATE,

  /**
   * The number is rounded up when positive and down when negative. This is
   * effectively ceiling the absolute value where the result preserves the sign.
   */
  UP,

  /**
   * The number is rounded down when positive and up when negative. This is
   * effectively floor the absolute value where the result preserves the sign.
   */
  DOWN
}


/**
 * Performs the requested operation on the given number, optionally taking
 * the absolute value of the number before the operation.
 *
 * @param value The number to operate on.
 * @param op The operation to perform.
 * @param absolute If the number should be positive before the operation.
 * @return The operated result, or the original value if its not a valid number.
 */
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
