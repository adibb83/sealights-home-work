import { Person } from "../../shell/models/person.model";

export function convertFormDataToPerson(formObj: any): Person | undefined {
  if (!formObj?.personInfo || formObj?.adresses) return undefined;
  const newPerson: Person = {
    name: formObj.personInfo.name,
    birthdate: formObj.personInfo.birthdate,
    addresses: formObj.addresses
  }

  return newPerson;
}
