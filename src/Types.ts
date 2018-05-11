


export interface FrequencyValueEvery
{
  every: number;
  offset?: number;
}

export type FrequencyValueOneOf = number[];

export type FrequencyValue = FrequencyValueEvery | FrequencyValueOneOf;

export interface FrequencyCheck
{
   (value: number): boolean;
   input?: any;
}
