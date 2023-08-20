import { City } from "./city.model";

export interface Country {
  id:number;
  name: string;
}


export interface PersonLocation extends Country{
  cities: City[] | [];
}
