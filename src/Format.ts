
import { Functions as fn } from './Functions';



export type Formatter<T> = (item: T) => string;

export interface FormatterMap<T> 
{
  [key: string]: Formatter<T>;
}

export interface FormatSection<T>
{
  size: number,
  formats: FormatterMap<T>
}

export interface FormatEscapes
{
  [first: string]: {
    start: string;
    startEscape: string;
    end: string;
    endEscape: string;
  }
}

export class Format<T>
{

  private cached: FormatterMap<T> = {};

  private sections: FormatSection<T>[] = [];

  private escapes: FormatEscapes;

  public constructor(formats: FormatterMap<T>, escapes: FormatEscapes = {})
  {
    this.add(formats);
    this.escapes = escapes;
  }

  public add(map: FormatterMap<T>): this
  public add(key: string, formatter: Formatter<T>): this
  public add(keyOrMap: string | FormatterMap<T>, formatter?: Formatter<T>): this
  {
    if (fn.isString(keyOrMap))
    {
      this.getSection(keyOrMap.length).formats[keyOrMap] = formatter;
    }
    else
    {
      for (const key in keyOrMap)
      {
        this.getSection(key.length).formats[key] = keyOrMap[key];
      }
    }

    return this;
  }

  public getSection(size: number): FormatSection<T>
  {
    const guess = this.sections.length - size;
    const guessSection = this.sections[guess];

    if (guessSection && guessSection.size === size)
    {
      return guessSection;
    }

    for (const section of this.sections)
    {
      if (section.size === size)
      {
        return section;
      }
    }

    const newSection = { size, formats: {} };

    this.sections.push(newSection);
    this.sortBySize();

    return newSection;
  }

  private sortBySize()
  {
    this.sections.sort((a, b) => b.size - a.size);
  }

  private getEscaped (x: string, i: number): false | [string, number]
  {
    const c = x.charAt(i);
    const escaped = this.escapes[c];

    if (!escaped)
    {
      return false;
    }

    const { start, end, startEscape, endEscape } = escaped;

    const possibleStart = x.substring(i, i + start.length);

    if (possibleStart !== start)
    {
      return false;
    }

    const possibleEscapeIndex = i - startEscape.indexOf(start);
    const possibleEscape = x.substring(possibleEscapeIndex, possibleEscapeIndex + startEscape.length);

    if (possibleEscape === startEscape)
    {
      return false;
    }

    i += start.length;

    const endOffset = endEscape.indexOf(end);
    let last = x.indexOf(end, i);
    let content: string = x.substring(i, last);

    i = last - endOffset;

    while (last !== -1 && x.substring(i, i + endEscape.length) === endEscape)
    {
      content = content.substring(0, content.length - endOffset);
      content += end;
      i += endEscape.length;
      last = x.indexOf(end, i);
      content += x.substring(i, last);
      i = last - endOffset;
    }

    if (last === -1)
    {
      return false;
    }

    return [content, last + end.length];
  }

  public getFormatter (format: string, cache: boolean = false): Formatter<T>
  {
    if (format in this.cached)
    {
      return this.cached[format];
    }

    const sections = this.sections;
    const formats: Formatter<T>[] = [];
    let constant: string = '';

    for (let i = 0; i < format.length; i++)
    {
      const escaped = this.getEscaped(format, i);

      if (escaped !== false)
      {
        const [ content, end ] = escaped;

        constant += content;
        i = end - 1;

        continue;
      }

      let handled: boolean = false;

      for (let k = 0; k < sections.length && !handled; k++)
      {
        const section = sections[ k ];
        const part: string = format.substring( i, i + section.size );

        if (part.length === section.size)
        {
          const formatter = section.formats[ part ];

          if (formatter)
          {
            formats.push(formatter);
            i += section.size - 1;
            handled = true;
          }
        }
      }

      if (handled)
      {
        if (constant)
        {
          const copy = constant;

          formats.splice(formats.length - 1, 0, () => copy);
          constant = '';
        }
      }
      else
      {
        constant += format.charAt(i);
      }
    }

    if (constant)
    {
      formats.push(() => constant);
    }

    const finalFormatter = (item: T) => 
    {
      let formatted: string = '';

      for (const formatter of formats)
      {
        formatted += formatter(item);
      }

      return formatted;
    };

    if (cache)
    {
      this.cached[format] = finalFormatter
    }

    return finalFormatter;
  }

  public format (format: string, item: T, cache: boolean = false): string
  {
    return this.getFormatter(format, cache)(item);
  }

}
