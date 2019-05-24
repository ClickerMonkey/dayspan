
/**
 * 
 */
export class Ref<T>
{

  /**
   * 
   */
  public dirty: boolean;

  /**
   * 
   */
  public shared: boolean;

  /**
   * 
   */
  public value: T;

  /**
   * 
   * @param value 
   * @param shared 
   */
  public constructor(value: T, shared: boolean)
  {
    this.value = value;
    this.shared = shared;
    this.dirty = false;
  }

  /**
   * 
   * @param newValue 
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
   * 
   * @param newValue 
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