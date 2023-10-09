import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-switch-input',
  templateUrl: './switch-input.component.html',
  styleUrls: ['./switch-input.component.css'],
})
export class SwitchInputComponent {
  @Input() label!: string;  
  @Input() fieldName!: string;
  @Input() isReadOnly = false;
  @Input() class: string = '';
  @Input() frmControlName!: string;
  @Input() form!: FormGroup;
  @Output() formChange = new EventEmitter<any>();  

  formFieldGetValue(): any {
    return this.form.value[this.frmControlName];
  }

  formFieldSetValue(event: Event) {
    this.form.get(this.frmControlName)?.setValue(event);
  }
}
