import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts!: Account[];
  @Input() searchInfo: string = '';
  subscription!: Subscription;
  destroy$ = new Subject<void>();
  loading: boolean = true;

  constructor(
    private readonly accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAccounts(): void {
    this.loading = true;

    this.accountService
      .getAccounts(this.searchInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: accList=> this.accounts = accList,
        error: err => console.log(err.name),
        complete: () => this.loading = false
      });
  }

  cleanSearchInfo(): void{
    this.searchInfo = '';
    this.getAccounts();
  }
}
