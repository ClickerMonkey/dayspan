
import { Identifier, IdentifierInput } from './Identifier';
import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Iterator } from './Iterator';


/**
 * A map of values in the [[ScheduleModifier]] keyed by the descriptions of the
 * identifiers.
 */
export interface ScheduleModifierDescription<T>
{
  [description: string]: T
}

/**
 * An object which carries the span taken from an identifier and the value
 * mapped to it in a [[ScheduleModifier]].
 */
export interface ScheduleModifierSpan<T>
{
  span: DaySpan,
  value: T
}

/**
 * A class that can modify the events of a schedule by storing [[Identifier]]s
 * and an associated value.
 *
 * @typeparam T The type of data that modifies the schedule.
 */
export class ScheduleModifier<T>
{

  /**
   * The map of values mapped by their [[Identifier]]s.
   */
  public map: { [id: string]: T };

  /**
   * Returns `true` if this modifier lacks any modifications, otherwise `false`.
   */
  public isEmpty(): boolean
  {
    // @ts-ignore
    for (let id in this.map)
    {
      return !id;
    }

    return true;
  }

  /**
   * Gets the most specific value in this modifier for the given day, if none
   * exists `otherwise` is returned. A modifier can have multiple values for a
   * given day because [[Identifier]]s represent a span of time.
   *
   * @param day The day to get a value for.
   * @param otherwise What to return if no value exists for the given day.
   * @param lookAtTime If the specific time of the given day should be looked at.
   * @returns The most specific value for the given day, or `otherwise`.
   */
  public get(day: Day, otherwise: T, lookAtTime: boolean = true): T
  {
    let map = this.map;

    return (lookAtTime && map[ day.timeIdentifier ]) ||
      map[ day.dayIdentifier ] ||
      map[ day.monthIdentifier ] ||
      map[ day.weekIdentifier ] ||
      map[ day.quarterIdentifier ] ||
      otherwise;
  }

  /**
   * Gets all values in this modifier for the given day. If none exist, an empty
   * array is returned. The values returned in the array are returned in most
   * specific to least specific.
   *
   * @param day The day to get the values for.
   * @returns An array of values (modifications) for the given day.
   */
  public getAll(day: Day): T[]
  {
    let map = this.map;
    let all: T[] = [];

    if (map[ day.timeIdentifier ]) all.push( map[ day.timeIdentifier ] );
    if (map[ day.dayIdentifier ]) all.push( map[ day.dayIdentifier ] );
    if (map[ day.monthIdentifier ]) all.push( map[ day.monthIdentifier ] );
    if (map[ day.weekIdentifier ]) all.push( map[ day.weekIdentifier ] );
    if (map[ day.quarterIdentifier ]) all.push( map[ day.quarterIdentifier ] );

    return all;
  }

  /**
   * Queries the modifier for all values/modifications which fall in the time
   * span that the given identifier represents. All identifiers and their value
   * are passed to the given callback.
   *
   * @param prefix The identifier
   *
   */
  public query(query: IdentifierInput): Iterator<[IdentifierInput, T]>
  {
    return new Iterator<[IdentifierInput, T]>((callback, iterator) =>
    {
      let map = this.map;

      for (let id in map)
      {
        if (Identifier.contains( query, id ))
        {
          let value: T = map[ id ];

          callback([id, value], iterator);

          if (!iterator.iterating)
          {
            break;
          }
        }
      }
    });
  }

  /**
   * Moves the value/modification from one identifier to another.
   *
   * @param from The day to take the identifier from.
   * @param fromType The identifier type.
   * @param to The day to move the value to.
   * @param toType The identifier type to move the value to.
   */
  public move(from: Day, fromType: Identifier, to: Day, toType: Identifier): this
  {
    let fromIdentifier = fromType.get( from );
    let toIdentifer = toType.get( to );

    this.map[ toIdentifer ] = this.map[ fromIdentifier ];

    delete this.map[ fromIdentifier ];

    return this;
  }

  /**
   * Sets the value/modification in this map given a day, the value, and the
   * identifier type.
   *
   * @param day The day to take an identifier from.
   * @param value The value/modification to set.
   * @param type The identifier type.
   */
  public set(day: Day, value: T, type: Identifier): this
  {
    this.map[ type.get( day ) ] = value;

    return this;
  }

  /**
   * Removes the value/modification from this modifier based on the identifier
   * pulled from the day.
   *
   * @param day The day to take an identifier from.
   * @param type The identifier type.
   */
  public unset(day: Day, type: Identifier): this
  {
    delete this.map[ type.get( day ) ];

    return this;
  }

  /**
   * Returns all identifiers stored in this modifier.
   */
  public identifiers(filter?: (value: T, id: IdentifierInput) => boolean): IdentifierInput[]
  {
    let map = this.map;
    let out: IdentifierInput[] = [];

    for (let id in map)
    {
      if (!filter || filter( map[ id ], id ))
      {
        out.push( id );
      }
    }

    return out;
  }

  /**
   * Builds a list of spans and the associated values. The spans are calculated
   * from the identiier key via [[Identifier.span]].
   *
   * @param endInclusive If the end date in the spans should be the last
   *    millisecond of the timespan or the first millisecond of the next.
   * @returns An array of spans calculated from the identifiers with the
   *    associated values/modifications.
   */
  public spans(endInclusive: boolean = false): ScheduleModifierSpan<T>[]
  {
    let map = this.map;
    let out: ScheduleModifierSpan<T>[] = [];

    for (let id in map)
    {
      let type: Identifier = Identifier.find(id);

      if (type)
      {
        out.push({
          span: type.span( id, endInclusive ),
          value: map[ id ]
        });
      }
    }

    return out;
  }

  /**
   * Builds a map of the values/modifications keyed by the descripton of the
   * identifier computed via [[Identifier.describe]].
   *
   * @param short If the description should use shorter language or longer.
   * @returns The built map of description to values/modifications.
   */
  public describeMap(short: boolean = false): ScheduleModifierDescription<T>
  {
    let map = this.map;
    let out: ScheduleModifierDescription<T> = {};

    for (let id in map)
    {
      let type: Identifier = Identifier.find(id);

      if (type)
      {
        out[ type.describe( id, short ) ] = map[ id ];
      }
    }

    return out;
  }

  /**
   * Builds a list of the descriptions of the identifiers in this modifier.
   *
   * @param short If the description should use shorter language or longer.
   * @returns The built list of descriptions.
   */
  public describeList(short: boolean = false): string[]
  {
    let map = this.map;
    let out: string[] = [];

    for (let id in map)
    {
      let type: Identifier = Identifier.find(id);

      if (type)
      {
        out.push( type.describe( id, short ) );
      }
    }

    return out;
  }

}
