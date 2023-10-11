import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent {
  errorMessage!: string;

  constructor(
    private activeModal: NgbActiveModal
  ) {

  }

  close(){
    this.activeModal.close();
  }
}
