import { Person } from './people.model';
import { StarShip } from './starships.model';

export interface SwapiResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string;
  next: string;
  results: ResResult[];
}

export interface ResResult {
  uid: string;
  name: string;
  url: string;
}

export interface ResElement {
  message: string;
  result: ResElementResult;
}

export interface ResElementResult {
  properties: Person & StarShip;
  description: string;
  uid: string;
}

export interface BattleElementFormatted {
  name: string;
  superPower: number;
}

export const initialBattleElement = {
  name: '',
  superPower: 0,
};
