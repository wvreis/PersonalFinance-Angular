import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent {
  @Input() label!: string;
  type: string = 'date';
  @Input() fieldName!: string;
  @Input() isReadOnly = false;
  @Input() frmControlName!: string;
  @Input() form!: FormGroup;
  @Output() formChange = new EventEmitter<any>();

  formFieldGetValue(): any {
    return this.form.value[this.frmControlName];
  }

  formFieldSetValue(event: Event) {
    var field = this.form.get(this.frmControlName);
    field?.setValue(event);
    field?.markAsTouched();
  }

  getValidInvalidClass(){
    var result: string[] = [];

    if (this.isFieldValid()){
      result.push('is-valid');
    }

    if (this.isFieldInvalidAndTouched()){
      result.push('is-invalid');
    }

    return result;
  }

  isFieldValid(): boolean{
    return this.form.get(this.fieldName)?.valid as boolean;
  }

  isFieldInvalidAndTouched(): boolean{
    var field = this.form.get(this.fieldName);
    return (field?.invalid && (field?.touched || field?.dirty)) as boolean;
  }
}
