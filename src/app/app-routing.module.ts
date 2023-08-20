import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingName } from './modules/core/models/routing-name.model';
import { ShellComponent } from './modules/shell/components/shell/shell.component';
import { AddPersonComponent } from './modules/features/add-person/add-person.component';
import { PersonsOverviewComponent } from './modules/features/persons-overview/persons-overview.component';
import { NotFoundPageComponent } from './modules/features/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: RoutingName.Empty,
    component: ShellComponent,
    children: [
      {
        path: RoutingName.Empty,
        redirectTo: `/${RoutingName.AddPerson}`,
        pathMatch: 'full'
      },
      {
        path: RoutingName.AddPerson,
        component: AddPersonComponent,
        pathMatch: 'full'
      },
      {
        path: RoutingName.PersonsOverview,
        component: PersonsOverviewComponent,
        pathMatch: 'full'
      },
      { path: '404', component: NotFoundPageComponent},
      { path: '**', redirectTo: '404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
