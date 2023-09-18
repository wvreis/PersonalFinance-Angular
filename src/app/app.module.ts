import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './features/accounts/accounts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelComponent } from './features/panel/panel.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { ApiInterceptor } from "./core/interceptors/api.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    PanelComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule    
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
