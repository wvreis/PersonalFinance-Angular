import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Transaction } from './../../../core/models/transaction/transaction.model';
import { TransactionType } from 'src/app/core/models/transaction-type/transaction-type.model';
import { Account } from 'src/app/core/models/account/account.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { TransactionTypeService } from 'src/app/core/services/transaction/transaction-type.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit, OnDestroy {
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
    private readonly transactionTypeService: TransactionTypeService,
  ) {
    
  }
  ngOnInit(): void {
    this.loadObjects();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadObjects(): void {
    forkJoin([
      this.transactionTypeService.getTransactionTypes(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: [transactionTypes: TransactionType[]]) => {
          this.getTransactionTypes(value['0']);          
        },
        complete: () => {
          this.loading = false
        },
      });
  }

  getTransactionTypes(transactionTypes: TransactionType[]): void {
    this.transactionTypes = transactionTypes;
  }
}
