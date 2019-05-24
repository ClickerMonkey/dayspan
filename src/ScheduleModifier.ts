
import { Iterate, IterateAction } from 'iteratez';

import { Day } from './Day';
import { DaySpan } from './DaySpan';
import { Functions as fn } from './Functions';
import { Identifier, IdentifierInput } from './Identifier';
import { Time } from './Time';


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


type Iter<R, T> = Iterate<R, string, ScheduleModifier<T>>


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
   * Creates a new schedule modifier.
   */
  public constructor()
  {
    this.map = {};
  }

  /**
   * Clears the modifier of all modifications.
   */
  public clear(): this
  {
    this.map = {};

    return this;
  }

  /**
   * Returns `true` if this modifier lacks any modifications, otherwise `false`.
   */
  public isEmpty(): boolean
  {
    // @ts-ignore
    for (const id in this.map)
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
    const map = this.map;

    return (lookAtTime && map[ day.timeIdentifier ]) ||
      map[ day.dayIdentifier ] ||
      map[ day.monthIdentifier ] ||
      map[ day.weekIdentifier ] ||
      map[ day.quarterIdentifier ] ||
      otherwise;
  }

  /**
   * Gets the most specific identifier type for the span over the given day.
   * If the day does not have a modification, `null` is returned.
   *
   * @param day The day to get the type for.
   * @param lookAtTime If the specific time of the given day should be looked at.
   * @returns The most specific identifier for the given day, otherwise `null`.
   */
  public getIdentifier(day: Day, lookAtTime: boolean = true): Identifier
  {
    const map = this.map;

    if (lookAtTime && fn.isDefined( map[ day.timeIdentifier ] )) return Identifier.Time;
    if (fn.isDefined( map[ day.dayIdentifier ] )) return Identifier.Day;
    if (fn.isDefined( map[ day.monthIdentifier ] )) return Identifier.Month;
    if (fn.isDefined( map[ day.weekIdentifier ] )) return Identifier.Week;
    if (fn.isDefined( map[ day.quarterIdentifier ] )) return Identifier.Quarter;
    if (fn.isDefined( map[ day.year ] )) return Identifier.Year;

    return null;
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
    const map = this.map;
    const all: T[] = [];

    if (map[ day.timeIdentifier ]) all.push( map[ day.timeIdentifier ] );
    if (map[ day.dayIdentifier ]) all.push( map[ day.dayIdentifier ] );
    if (map[ day.monthIdentifier ]) all.push( map[ day.monthIdentifier ] );
    if (map[ day.weekIdentifier ]) all.push( map[ day.weekIdentifier ] );
    if (map[ day.quarterIdentifier ]) all.push( map[ day.quarterIdentifier ] );

    return all;
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
    const fromIdentifier = fromType.get( from );
    const toIdentifier = toType.get( to );

    this.map[ toIdentifier ] = this.map[ fromIdentifier ];

    delete this.map[ fromIdentifier ];

    return this;
  }

  /**
   * Moves any identifiers with the matching time `fromTime` to `toTime` and
   * returns the number of moves.
   *
   * @param fromTime The time to move from.
   * @param toTime The time to move to.
   * @returns The number of modifiers moved.
   */
  public moveTime(fromTime: Time, toTime: Time): number
  {
    const type: Identifier = Identifier.Time;
    const moveIds: IdentifierInput[] = [];

    this.iterate().each(([id, value]) =>
    {
      if (type.is( id ))
      {
        const start: Day = type.start( id );

        if (start.sameTime( fromTime ))
        {
          moveIds.push( id );
        }
      }
    });

    let moved: number = 0;

    for (const id of moveIds)
    {
      const value: T = this.map[ id ];
      const start: Day = type.start( id );
      const newStart: Day = start.withTime( toTime );
      const newId: IdentifierInput = type.get( newStart );

      if (!this.map[ newId ])
      {
        this.map[ newId ] = value;
        delete this.map[ id ];
        moved++;
      }
    }

    return moved;
  }

  /**
   * Removes any identifiers and modifications that are at the given time.
   *
   * @param time The time to remove.
   * @returns The number of modifiers removed.
   */
  public removeTime(time: Time): number
  {
    const type: Identifier = Identifier.Time;
    let removed: number = 0;

    this.iterate().each(([id,], key, iterator) =>
    {
      if (type.is( id ))
      {
        const start: Day = type.start( id );

        if (start.sameTime( time ))
        {
          iterator.remove();
          removed++;
        }
      }
    });

    return removed;
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
   * Iterates through the modifiers passing the identifier and the related value.
   *
   * @returns A new instance of an [[Iterator]].
   */
  public iterate(): Iter<[IdentifierInput, T], T>
  {
    return new Iterate<[IdentifierInput, T], string, ScheduleModifier<T>>(iterator =>
    {
      const map = this.map;

      for (const rawId in map)
      {
        const asNumber: number = parseInt( rawId );
        const validAsNumber: boolean = asNumber + '' === rawId;
        const id: IdentifierInput = validAsNumber ? asNumber : rawId;

        switch (iterator.act([id, map[ rawId ]], rawId))
        {
          case IterateAction.STOP:
            return;
          case IterateAction.REMOVE:
            delete map[ rawId ];
            break;
        }
      }
    });
  }

  /**
   * Queries the modifier for all values/modifications which fall in the time
   * span that the given identifier represents. All identifiers and their value
   * are passed to the given callback.
   *
   * @param prefix The identifier
   * @returns A new instance of an [[Iterator]].
   */
  public query(query: IdentifierInput): Iter<[IdentifierInput, T], T>
  {
    return this.iterate()
      .where(([id, value]) => Identifier.contains( query, id ));
    ;
  }

  /**
   * Returns all identifiers stored in this modifier.
   */
  public identifiers(filter?: (value: T, id: IdentifierInput) => boolean): Iter<IdentifierInput, T>
  {
    return this.iterate()
      .where(([id, value]) => !filter || filter( value, id ))
      .transform<IdentifierInput>(([id, ]) => id)
    ;
  }

  /**
   * Builds a list of spans and the associated values. The spans are calculated
   * from the identifier key via [[Identifier.span]].
   *
   * @param endInclusive If the end date in the spans should be the last
   *    millisecond of the timespan or the first millisecond of the next.
   * @returns An array of spans calculated from the identifiers with the
   *    associated values/modifications.
   */
  public spans(endInclusive: boolean = false): Iter<ScheduleModifierSpan<T>, T>
  {
    return this.iterate()
      .transform(([id, value]) =>
      {
        const type: Identifier = Identifier.find(id);

        if (type)
        {
          const span = type.span( id, endInclusive );

          return { span, value };
        }
      })
    ;
  }

  /**
   * Builds a list of the descriptions of the identifiers in this modifier.
   *
   * @param short If the description should use shorter language or longer.
   * @returns The built list of descriptions.
   */
  public describe(short: boolean = false): Iter<string, T>
  {
    return this.iterate()
      .transform<string>( ([id, ]) =>
      {
        const type: Identifier = Identifier.find( id );

        if (type)
        {
          return type.describe( id, short );
        }
      })
    ;
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
    const map = this.map;
    const out: ScheduleModifierDescription<T> = {};

    for (const id in map)
    {
      const type: Identifier = Identifier.find(id);

      if (type)
      {
        out[ type.describe( id, short ) ] = map[ id ];
      }
    }

    return out;
  }

}
