import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './features/accounts/accounts.component';
import { PanelComponent } from './features/panel/panel.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { AccountFormComponent } from './features/accounts/account-form/account-form.component';
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { ApiInterceptor } from "./core/interceptors/api.interceptor";
import { NavMenuComponent } from './core/layout/nav-menu/nav-menu.component';
import { ErrorPopupComponent } from './shared/error-popup/error-popup.component';
import { GeneralInputComponent } from './shared/inputs/general-input/general-input.component';
import { SwitchInputComponent } from './shared/inputs/switch-input/switch-input.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { TransactionFormComponent } from './features/transactions/transaction-form/transaction-form.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    PanelComponent,
    TransactionsComponent,
    AccountFormComponent,
    NavMenuComponent,
    ErrorPopupComponent,
    GeneralInputComponent,
    SwitchInputComponent,
    ErrorPageComponent,
    TransactionFormComponent
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
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
