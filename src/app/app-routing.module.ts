import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './features/accounts/accounts.component';
import { AppComponent } from './app.component';
import { PanelComponent } from './features/panel/panel.component';
import { TransactionsComponent } from './features/transactions/transactions.component';

const routes: Routes = [
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'panel',
    component: PanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
