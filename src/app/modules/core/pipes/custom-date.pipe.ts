import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
 public constructor(private datePipe: DatePipe) {}
  transform(value: string): unknown {
    if (value !== 'NA') {
      const parsedDate = new Date(value);
      return  this.datePipe.transform(parsedDate, 'mediumDate');
    } else if (value === 'NA') {
      return 'Not Available';
    } else {
      return value;
    }
  }

}
