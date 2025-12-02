// export enum Weather {
//   Sunny = 'sunny',
//   Rainy = 'rainy',
//   Cloudy = 'cloudy',
//   Stormy = 'stormy',
//   Windy = 'windy',
// }

// export enum Visibility {
//   Great = 'great',
//   Good = 'good',
//   Ok = 'ok',
//   Poor = 'poor',
// }
// read here: https://www.totaltypescript.com/erasable-syntax-only


export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export const visibilityValues: Visibility[] = ['great', 'good', 'ok', 'poor'];

export const weatherValues: Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export const isWeather = (param: string): param is Weather => {
  return weatherValues.includes(param as Weather);
};

export const isVisibility = (param: string): param is Visibility => {
  return visibilityValues.includes(param as Visibility);
};