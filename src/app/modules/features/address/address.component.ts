import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { PersonLocation } from '../../shell/models/country.model';
import { AddressFormEvent, AddressFormEventArgs } from '../../shell/models/address-form-event-args.model';
import { City } from '../../shell/models/city.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public _countries: PersonLocation[];
  @Input() formArrayName: string;
  @Input() public set countries(value: PersonLocation[]) {
    this._countries = value;
  }

  @Output() public addressEvent: EventEmitter<AddressFormEventArgs> = new EventEmitter<AddressFormEventArgs>();
  public formArray!: FormArray;
  public form: FormGroup;
  public cityOptions: City[];

  constructor(private formGroupDirective: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.formGroupDirective.control;
    this.formArray = this.form.get(this.formArrayName) as FormArray;
  }

  public deleteAddressForm(index:number):void {
    const event: AddressFormEventArgs = {eventType: AddressFormEvent.DeleteAddressForm, index:index}
    this.addressEvent.emit(event);
  }

  public addCity(index: number): void{
    const event: AddressFormEventArgs = {eventType: AddressFormEvent.AddCity, location: this.getCountryById(index)}
    this.addressEvent.emit(event);
  }

  public onCountrySelectChange(index: number): void {
    this.resetCityDropDown(index);
  }

  private resetCityDropDown(index: number):void {
    this.formArray.controls[index].get('cityId').setValue('') ;
  }

  private getCountryById(index: number): PersonLocation {
    const contry: PersonLocation = this._countries.find(country => country.id === this.getSelectedCountryId(index));
    return contry;
  }

  public getCitiesList(index: number): City[] | [] {
    return this._countries.find(country => country.id === this.formArray.controls[index].get('countrId')?.value)?.cities || [];
  }

  public getSelectedCountryId(index: number): number {
    return this.formArray.controls[index].get('countrId')?.value;
  }
}
