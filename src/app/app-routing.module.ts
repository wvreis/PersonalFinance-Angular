import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './features/accounts/accounts.component';
import { AppComponent } from './app.component';
import { PanelComponent } from './features/panel/panel.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { AccountFormComponent } from './features/accounts/account-form/account-form.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/new', component: AccountFormComponent },
  { path: 'accounts/:id', component: AccountFormComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'error', component: ErrorPageComponent},
  { path: '*', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
