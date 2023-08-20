import { Component } from '@angular/core';
import { RoutingName } from '../../core/models/routing-name.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {

  public constructor(private router: Router){}
  public back(): void {
    this.router.navigate([`/${RoutingName.PersonsOverview}`])
  }
}
