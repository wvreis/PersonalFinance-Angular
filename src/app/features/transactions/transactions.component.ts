import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Transaction } from 'src/app/core/models/transaction/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions!: Transaction[];
  @Input() searchInfo: string = '';
  @Input() startDate?: string;
  @Input() endDate?: string;
  destroy$ = new Subject<void>();
  loading: boolean = true;

  constructor(
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  getTransactions(): void {
    this.transactionService
      .getTransactions(this.searchInfo, this.startDate, this.endDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: transactionList => this.transactions = transactionList,
        error: err => console.log(err.name),
        complete: () => this.loading = false
      });
  }

  cleanSearchInfo(): void {
    this.searchInfo = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.getTransactions();
  }

  onDateChange(): void {
    this.getTransactions();
  }
}
