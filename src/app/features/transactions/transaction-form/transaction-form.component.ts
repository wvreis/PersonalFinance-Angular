import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Transaction } from './../../../core/models/transaction/transaction.model';
import { TransactionType } from 'src/app/core/models/transaction-type/transaction-type.model';
import { Account } from 'src/app/core/models/account/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  transactionForm!: FormGroup;
  transaction: Transaction = new Transaction();
  loading: boolean = true;
  formErros!: string;
  routeId!: number;

  destroy$ = new Subject<void>();
  transactionTypes!: TransactionType[];
  accounts!: Account[];

  constructor(
    private readonly accountService: AccountService,
  ) {
    
  }
}
