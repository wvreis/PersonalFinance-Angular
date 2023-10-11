import { Component, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorPopupComponent } from 'src/app/shared/error-popup/error-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly ngbModal: NgbModal,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        const errorModalRef = this.ngbModal
          .open(ErrorPopupComponent, { centered: true});

        errorModalRef.componentInstance.errorMessage =
          error.error.error === undefined ?
          error.name :
          error.error.error.details;

        return throwError(() => error);
      })
    );
  }
}
