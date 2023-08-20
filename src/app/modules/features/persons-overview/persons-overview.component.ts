import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../shell/services/person.service';
import { Person } from '../../shell/models/person.model';
import { Subscription } from 'rxjs';
import { RoutingName } from '../../core/models/routing-name.model';

@Component({
  selector: 'app-persons-overview',
  templateUrl: './persons-overview.component.html',
  styleUrls: ['./persons-overview.component.scss']
})
export class PersonsOverviewComponent implements OnInit, OnDestroy {
  private personSub: Subscription;
  public dataSource: Person[];
  public displayedColumns: string[]
  public constructor(
    private personService: PersonService,
    public router: Router

  ) { }


 public ngOnInit(): void {
    this.displayedColumns = ['id', 'name', 'birthdate', 'addresses'];
    this.subscribeToPersonsDataStream();
  }

  private subscribeToPersonsDataStream(): void {
    this.personService.RefreshPersonsData();
    this.personSub = this.personService.personsStream.subscribe(data => {
      if (data) {
        this.dataSource = data;
      }
    });
  }

  public addPerson(): void {
    this.router.navigate([`/${RoutingName.AddPerson}`]);
  }
  public ngOnDestroy(): void {
    if(this.personSub){
      this.personSub.unsubscribe();
    }
  }

}
