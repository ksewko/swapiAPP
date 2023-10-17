import { Person } from './people.model';

export interface StarShip {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: Person[];
  created: string;
  edited: string;
  name: string;
  url: string;
}
