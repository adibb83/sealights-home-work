import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalSnackBarService } from '../../services/global-snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-global-snack-bar',
  templateUrl: './global-snack-bar.component.html',
  styleUrls: ['./global-snack-bar.component.scss']
})
export class GlobalSnackBarComponent implements OnInit, OnDestroy {

  private snackBarSub$: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private snackBarService: GlobalSnackBarService
  ) { }

  ngOnDestroy(): void {
    this.snackBarSub$.unsubscribe();
  }


  ngOnInit(): void {
    this.registerToSnackBarEvents()
  }

  private registerToSnackBarEvents() {
    this.snackBarSub$ = this.snackBarService.messagesStream.subscribe(message => {
      this.openSnackBar(message);
    })
  }

  private openSnackBar(message: string, action: string = 'X', duration: number = 5000) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
