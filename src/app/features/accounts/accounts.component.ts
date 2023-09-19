import { HttpClient } from '@angular/common/http';
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
    private readonly http: HttpClient,
    private readonly accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.GetAccounts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  GetAccounts(): void {
    this.loading = true;    
    
    this.accountService
      .GetAccounts(this.searchInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({ 
        next: accList=> this.accounts = accList,
        complete: () => this.loading = false
      });          
  }

  CleanSearchInfo(): void{
    this.searchInfo = '';
    this.GetAccounts();
  }
}
