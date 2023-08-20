import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription, take } from "rxjs";
import { AddressFormEvent, AddressFormEventArgs } from "../../shell/models/address-form-event-args.model";
import { GlobalSnackBarService } from "../../shell/services/global-snack-bar.service";
import { Router } from "@angular/router";
import { RoutingName } from "../../core/models/routing-name.model";
import { Person } from "../../shell/models/person.model";
import { MatDialog } from "@angular/material/dialog";
import { AddCityDialogComponent } from "../../shell/components/add-city-dialog/add-city-dialog.component";
import { Country, PersonLocation } from "../../shell/models/country.model";
import { PersonService } from "../../shell/services/person.service";
import { __await } from "tslib";
import { City } from "../../shell/models/city.model";
import { convertFormDataToPerson } from "../../core/helpers/json-helper";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit, OnDestroy {
  public personForm!: FormGroup;
  public countries: Country[];
  private countriesSub: Subscription
  private readonly AddressFormEvent: typeof AddressFormEvent = AddressFormEvent;

  public constructor(
    private fb: FormBuilder,
    private globalSnackBarService: GlobalSnackBarService,
    private personService: PersonService,
    public router: Router,
    public dialog: MatDialog) { }



  get addressesControl(): FormArray {
    return this.personForm.controls['addresses'] as FormArray;
  }


  public ngOnInit(): void {
    this.subscribeToCountriseDataStream();
    this.createForm();
    this.addAddress();
  }

  private subscribeToCountriseDataStream() {
    this.personService.RefreshCountriesData();
    this.countriesSub = this.personService.countriesStream.subscribe(data => {
      if (data) {
        this.countries = data;
      }
    });
  }

  private createForm(): void {
    this.personForm = this.fb.group({
      personInfo: this.fb.group({
        name: ['', Validators.required],
        birthdate: [],
      }),
      addresses: this.fb.array([])
    });
  }

  public addAddress(): void {
    const defaultAddressFormGroup = this.fb.group({
      name: ['', Validators.required],
      countrId: [],
      cityId: [],
      street: ['', Validators.required],
    });

    this.addressesControl.push(defaultAddressFormGroup);
  }

  private deleteAddress(addressGroupIndex: number): void {
    this.addressesControl.removeAt(addressGroupIndex);
  }

  public addressEvent(args: AddressFormEventArgs): void {
    switch (args.eventType) {
      case this.AddressFormEvent.AddAddressForm:
        this.addAddress();
        break;
      case this.AddressFormEvent.DeleteAddressForm:
        if (!args?.index) {
          this.globalSnackBarService.openSnackMessage('error on delete address');
          return;
        }
        this.deleteAddress(args.index)
        break;
      case this.AddressFormEvent.AddCity:
        if (!args?.location) {
          this.globalSnackBarService.openSnackMessage('error on add new city');
          return;
        }
        this.openAddCityDialog(args.location);
        break;
    }
  }

  public save(): void {

    const formObj = this.personForm.getRawValue();
    const newPerson: Person | undefined = convertFormDataToPerson(formObj);

    if (!newPerson) {
      this.globalSnackBarService.openSnackMessage('error on saving new person');
      return;
    }

    this.personService.saveNewPerson(newPerson).pipe(take(1)).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message) {
          this.globalSnackBarService.openSnackMessage(res.message);
          this.personService.RefreshPersonsData();
          this.router.navigate([`/${RoutingName.PersonsOverview}`]);
        }
      },
      error: (err) => { console.log(err) }
    });
  }


  private openAddCityDialog(personLocation: PersonLocation): void {
    const dialogRef = this.dialog.open(AddCityDialogComponent, { data: personLocation });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCityByCountryId(result, personLocation.id)
      }
    });
  }


  private addCityByCountryId(cityName: string, countryId: number) {
    const city: City = { name: cityName, countryId: countryId };
    this.personService.addCity(city).pipe(take(1)).subscribe({
      next: (res) => {
        if (res.message) {
          this.globalSnackBarService.openSnackMessage(res.message);
          this.personService.RefreshCountriesData();
        }
      },
      error: (err) => { console.log(err) }
    });
  }

  public ngOnDestroy(): void {
    if (this.countriesSub) {
      this.countriesSub.unsubscribe();
    }
  }
}
