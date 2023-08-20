import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSnackBarService {

  private messages: Subject<string> = new Subject<string>();
  public messagesStream: Observable<string> = this.messages.asObservable();

  public openSnackMessage(message: string): void {
    this.messages.next(message);
  }

}
