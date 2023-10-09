import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorPopupComponent } from 'src/app/shared/error-popup/error-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly ngbModal: NgbModal
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.ngbModal.open(
          error.details === undefined ? error.name : error.details,
          { centered: true }
        );

        return throwError(() => error);
      })
    );
  }
}
