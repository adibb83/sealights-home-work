import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit{
  @Input() formGroupName!: string;
  public form!: FormGroup;

  public getFormControl(name: string): FormControl{
    return this.form.get(name) as FormControl
  }
  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.formGroupDirective.control.get(this.formGroupName) as FormGroup;
  }

}
