import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './features/accounts/accounts.component';
import { PanelComponent } from './features/panel/panel.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { AccountFormComponent } from './features/accounts/account-form/account-form.component';
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { ApiInterceptor } from "./core/interceptors/api.interceptor";
import { NavMenuComponent } from './core/layout/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    PanelComponent,
    TransactionsComponent,
    AccountFormComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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
