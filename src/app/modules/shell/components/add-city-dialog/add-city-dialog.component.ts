import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonLocation } from '../../models/country.model';
import { textOnlyRegex } from 'src/app/modules/core/helpers/validations';
import { City } from '../../models/city.model';

const MESSAGE_DURATION: number = 3000;

@Component({
  selector: 'app-add-city-dialog',
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,]
})
export class AddCityDialogComponent implements OnInit {
  public city: string;
  public form: FormGroup;
  public isCityAlreadyExists: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: PersonLocation,
    private fb: FormBuilder) { }


    get cityFormControl(): FormControl {
      return this.form.get('city') as FormControl
    }
    ngOnInit(): void {
      this.form = this.fb.group({
        city: ['', [Validators.required, Validators.pattern(textOnlyRegex)]]
    });  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public saveCity(): void {
    this.isCityAlreadyExists = !!this.data.cities.find((city: City) => city.name.toLowerCase().includes(this.cityFormControl.value.toLowerCase()));
    if(this.isCityAlreadyExists){
      setTimeout(() => {
        this.isCityAlreadyExists = false;
      }, MESSAGE_DURATION);
      return;
    }
    this.dialogRef.close(this.cityFormControl.value);
  }
}
