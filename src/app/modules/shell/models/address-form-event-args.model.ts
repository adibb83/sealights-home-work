import { PersonLocation } from "./country.model";

export interface AddressFormEventArgs {
  eventType: string;
  index?: number;
  location?:PersonLocation
}

export enum AddressFormEvent {
  AddAddressForm = 'add-address-form',
  DeleteAddressForm ='delete-address-form',
  AddCity = 'add-city'
}
