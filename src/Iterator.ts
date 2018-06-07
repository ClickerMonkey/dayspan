
import { Functions as fn } from './Functions';


/**
 * The callback which is invoked for each item in the Iterator. The callback
 * can call [[Iterator.stop]] at anytime to stop iteration.
 *
 * @param item The item found in the iterator.
 * @param iterator The iterator with the item.
 * @returns The result of the callback.
 */
export type IteratorCallback<T, R> = (item: T, iterator: Iterator<T>) => R;

/**
 * An [[Iterator]] source which handles iterating over items and calls
 * `callback` for each item, checking [[Iterator.iterating]] after each
 * invokation to stop iteration as early as possible.
 *
 * @param callback The function to invoke for each item.
 * @param iterator The iterator to check for early exists.
 */
export type IteratorSource<T, R> = (callback: IteratorCallback<T, R>, iterator: Iterator<T>) => any;

/**
 * A filter to apply duration iteration to only look at certain items when this
 * function returns `true`.
 *
 * @param item The item being iterated.
 * @returns `true` if the item should be iterated, otherwise `false`.
 */
export type IteratorFilter<T> = (item: T) => boolean;

/**
 * A class that allows an iteratable source to be iterated any number of times
 * by providing the following functionality:
 *
 * - [[Iterator.isEmpty]]: Determines whether the source contains any items.
 * - [[Iterator.first]]: Gets the first item in the source.
 * - [[Iterator.count]]: Counds the number of items in the source.
 * - [[Iterator.list]]: Builds a list of the items in the source.
 * - [[Iterator.map]]: Maps each item in the source to another item by returning
 *    a new Iterator.
 * - [[Iterator.iterate]]: Invokes a function for each item in the source.
 *
 * ```typescript
 * let iter = object.iterateThings();
 * iter.isEmpty();              // no items?
 * iter.isEmpty(d => d.flag);   // no items that meet some criteria?
 * iter.count();                // number of items
 * iter.count(d => d.flag);     // number of items that meet some criteria
 * iter.first();                // first item
 * iter.first(d => d.flag);     // first item that meets some criteria
 * iter.list();                 // get all items as array
 * iter.list(myArray);          // add all items to given array
 * iter.list([], d => d.flag);  // get all items as array that meet some criteria
 * iter.map<S>(d => d.subitem); // return an iterator for subitems if they exist
 * iter.iterate(d => log(d));   // do something for each item
 * ```
 *
 * @typeparam The type of item being iterated.
 */
export class Iterator<T>
{

  /**
   * A result of the iteration passed to [[Iterator.stop]].
   */
  public result: any = undefined;

  /**
   * Whether or not this iterator is currently iterating over the source.
   */
  public iterating: boolean = false;

  /**
   * The source of iterable items. This allows the iteration over any type of
   * structure. The source must call the callback for each item and its
   * recommended that the source checks the [[Iterator.iterating]] flag after
   * each callback invokation.
   */
  private source: IteratorSource<T, any>;

  /**
   * Creates a new Iterator given a source.
   *
   * @param source The source of items to iterator.
   */
  public constructor(source: IteratorSource<T, any>)
  {
    this.source = source;
  }

  /**
   * Stops iteration and optionally sets the result of the iteration.
   *
   * @param result The result of the iteration.
   */
  public stop(result?: any): this
  {
    this.result = result;
    this.iterating = false;

    return this;
  }

  /**
   * Determines with this iterator is empty. A filter function can be specified
   * to only check for items which match certain criteria.
   *
   * @param filter A function to the checks items for certain criteria.
   * @returns `true` if no valid items exist in the source.
   */
  public isEmpty(filter: IteratorFilter<T> = null): boolean
  {
    let empty: boolean = true;

    this.iterate((item, iterator) =>
    {
      if (filter && !filter( item ))
      {
        return;
      }

      empty = false;
      iterator.stop();
    });

    return empty;
  }

  /**
   * Counts the number of items in the iterator. A filter function can be
   * specified to only count items which match certain criteria.
   *
   * @param filter A function to count items for certain criteria.
   * @returns The number of items in the source that optionally match the given
   *    criteria.
   */
  public count(filter: IteratorFilter<T> = null): number
  {
    let total: number = 0;

    this.iterate((item, iterator) =>
    {
      if (filter && !filter( item ))
      {
        return;
      }

      total++;
    });

    return total;
  }

  /**
   * Returns the first item in the iterator. A filter function can be specified
   * to only return the first item which matches certain criteria.
   *
   * @param filter A function to compare items to to match certain criteria.
   * @returns The first item found that optonally matches the given criteria.
   */
  public first(filter: IteratorFilter<T> = null): T
  {
    let first: T = null;

    this.iterate((item, iterator) =>
    {
      if (filter && !filter( item ))
      {
        return;
      }

      first = item;
      iterator.stop();
    });

    return first;
  }

  /**
   * Builds a list of items from the source. A filter function can be specified
   * so the resulting list only contain items that match certain criteria.
   *
   * @param out The array to place the items in.
   * @param filter The function which determines which items are added to the list.
   * @returns The reference to `out` which has had items added to it which
   *    optionally match the given criteria.
   */
  public list(out: T[] = [], filter: IteratorFilter<T> = null): T[]
  {
    this.iterate((item, iterator) =>
    {
      if (filter && !filter( item ))
      {
        return;
      }

      out.push( item );
    });

    return out;
  }

  /**
   * Returns an iterator where this iterator is the source and the returned
   * iterator is built from mapped items pulled from items in the source
   * of this iterator. If the given callback `outerCallback` does not return
   * a mapped value then the returned iterator will not see the item. A filter
   * function can be specified to only look at mapping items which match
   * certain criteria.
   *
   * @param outerCallback The function which maps an item to another.
   * @param filter The function which determines if an item should be mapped.
   * @returns A new iterator for the mapped items from this iterator.
   */
  public map<W>(outerCallback: IteratorCallback<T, W>, filter: IteratorFilter<T> = null): Iterator<W>
  {
    return new Iterator<W>((innerCallback, inner) =>
    {
      this.iterate((outerItem, outer) =>
      {
        if (filter && !filter( outerItem ))
        {
          return;
        }

        let innerItem: W = outerCallback( outerItem, outer );

        if (fn.isDefined( innerItem ))
        {
          innerCallback( innerItem, inner );
        }

        if (!outer.iterating)
        {
          inner.stop();
        }
      });
    });
  }

  /**
   * Invokes the callback for each item in the source of this iterator. The
   * second argument in the callback is the reference to this iterator and
   * [[Iterator.stop]] can be called at anytime to cease iteration.
   *
   * @param callback The function to invoke for each item in this iterator.
   */
  public iterate(callback: IteratorCallback<T, any>): this
  {
    this.result = undefined;
    this.iterating = true;
    this.source( callback, this );
    this.iterating = false;

    return this;
  }

}
