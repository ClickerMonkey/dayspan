
/**
 * Holds a reference to a value. Multiple things can share the reference, or 
 * have their own. The shared value can be changed to a new value making all
 * other references dirty so they know they need to be updated.
 */
export class Ref<T>
{

  /**
   * If this reference is holding a dirty (out of date) value.
   */
  public dirty: boolean;

  /**
   * If the value is shared by multiple things.
   */
  public shared: boolean;

  /**
   * The value the reference points to.
   */
  public value: T;

  /**
   * Creates a new reference to the given value.
   * 
   * @param value The value the reference points to.
   * @param shared If the value is shared by multiple things.
   */
  public constructor(value: T, shared: boolean)
  {
    this.value = value;
    this.shared = shared;
    this.dirty = false;
  }

  /**
   * Returns a reference to update to the new value.
   * 
   * If this reference is shared, a new reference instance will be returned.
   * If this reference is not shared, the value on this instance will be 
   * updated and the reference to this instance will be returned.
   * 
   * @param newValue The new value for the reference returned.
   */
  public getUpdate(newValue: T): Ref<T>
  {
    if (this.shared)
    {
      return new Ref<T>(newValue, false);
    }
    else
    {
      this.value = newValue;

      return this;
    }
  }

  /**
   * Returns a reference to update to a new value making this shared 
   * reference dirty.
   * 
   * If this reference is shared, this reference is marked dirty and a new 
   * reference is returned with the new value.
   * If this reference is not shared, the value on this instance will be 
   * updated and the reference to this instance will be returned.
   * 
   * @param newValue The new value for the reference returned.
   */
  public getReplace(newValue: T): Ref<T>
  {
    if (this.shared)
    {
      this.dirty = true;

      return new Ref<T>(newValue, true);
    }
    else
    {
      this.value = newValue;

      return this;
    }
  }

}