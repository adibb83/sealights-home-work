import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ShellComponent } from './components/shell/shell.component';
import { AddPersonComponent } from '../features/add-person/add-person.component';
import { PersonsOverviewComponent } from '../features/persons-overview/persons-overview.component';
import { RouterModule } from '@angular/router';
import { PersonInfoComponent } from '../features/person-info/person-info.component';
import { AddressComponent } from '../features/address/address.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalSnackBarComponent } from './components/global-snack-bar/global-snack-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomDatePipe } from '../core/pipes/custom-date.pipe';
import { NotFoundPageComponent } from '../features/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    ShellComponent,
    AddPersonComponent,
    PersonsOverviewComponent,
    AddressComponent,
    PersonInfoComponent,
    GlobalSnackBarComponent,
    NotFoundPageComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers:[DatePipe]
})
export class ShellModule { }
