import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Transaction } from './../../../core/models/transaction/transaction.model';
import { TransactionType } from 'src/app/core/models/transaction-type/transaction-type.model';
import { Account } from 'src/app/core/models/account/account.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { TransactionTypeService } from 'src/app/core/services/transaction-type/transaction-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionFormBuilderService } from 'src/app/core/services/transaction/transaction-form-builder.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { AddTransaction } from 'src/app/core/models/transaction/add-transaction.model';
import { TransactionStatus, transactionStatusToString } from 'src/app/core/enums/transaction-status.enum';
import { TransactionNature, transactionNatureToString } from 'src/app/core/enums/transaction-nature.enum';

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

  transactionStatusString: any = transactionStatusToString;
  transactionNatureString: any = transactionNatureToString;
  transactionStatus: Array<any> = Object.keys(TransactionStatus).filter(key => TransactionStatus[+key]);
  transactionNature: Array<any> = Object.keys(TransactionNature).filter(key => TransactionNature[+key]);

  destroy$ = new Subject<void>();
  transactionTypes!: TransactionType[];
  accounts!: Account[];

  constructor(
    private readonly accountService: AccountService,
    private readonly transactionTypeService: TransactionTypeService,
    private readonly transactionService: TransactionService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly transactionFormBuilderService: TransactionFormBuilderService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.routeId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.transactionForm = this.transactionFormBuilderService.buildFormGroup(this.transaction);
    this.loadObjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadObjects(): void {
    forkJoin([
      this.transactionTypeService.getTransactionTypes(),
      this.accountService.getAccounts('')
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: [transactionTypes: TransactionType[], accounts: Account[]]) => {
          this.getTransactionTypes(value['0']);
          this.getAccounts(value['1']);
          this.getTransaction();
        },
        complete: () => {
          this.loading = false
        },
      });
  }

  getTransactionTypes(transactionTypes: TransactionType[]): void {
    this.transactionTypes = transactionTypes;
  }

  getAccounts(accounts: Account[]): void {
    this.accounts = accounts;
  }

  getTransaction(): void {
    if (this.routeId > 0) {
      this.transactionService
        .getTransaction(this.routeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (transaction) => {
            this.transactionFormBuilderService.fillTransactionForm(this.transactionForm, transaction)
          },
          error: (err) => this.handleNotFound()
        });
    }
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      if (this.routeId == 0) {
        this.addTransaction();
      } else {
        this.updateTransaction();
      }
    }
  }

  addTransaction(): void {
    let newTransaction = new AddTransaction();
    newTransaction.fillPropertiesFromForm(this.transactionForm);

    this.transactionService
      .postTransaction(newTransaction)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (errors) => console.log(errors),
        complete: () => this.router.navigate(['transactions']),
      });
  }

  updateTransaction(): void {
    this.transaction.fillTransactionWithFormValues(this.routeId, this.transactionForm);

    this.transactionService
      .putTransaction(this.transaction)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (errors) => console.log(errors),
        complete: () => this.router.navigate(['transactions']),
      });
  }

  handleNotFound() {
    this.loading = true;
    //to do: improve this.
  }
}
