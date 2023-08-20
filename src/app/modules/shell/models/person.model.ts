import { Address } from "./address.model";

export interface Person {
  id?: number;
  name: string;
  birthdate: string;
  addresses: Address[];
}

