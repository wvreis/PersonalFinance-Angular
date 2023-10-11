import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent {
  errorMessage!: string;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  close(){
    this.activeModal.close();
  }
}
