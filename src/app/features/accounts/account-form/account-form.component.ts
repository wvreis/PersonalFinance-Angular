import { BankService } from './../../bank/bank.service';
import { FormBuilder } from '@angular/forms';
import { AccountService } from './../account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { Bank } from 'src/app/core/models/bank.model';
import { AccountType } from 'src/app/core/models/account-type.model';
import { AccountTypeService } from '../../account-types/account-type.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit, OnDestroy {
  banks!: Bank[];
  accountTypes!: AccountType[];
  account!: Account;
  loading: boolean = true;
  destroy$ = new Subject<void>();

  constructor(
    private readonly accountService: AccountService,
    private readonly accountTypeService: AccountTypeService,
    private readonly bankService: BankService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.GetAccount();
    this.GetBanks();
    this.GetAccountTypes();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  GetAccount(): void{
    this.loading = true;
    var id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.accountService
      .GetAccount(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: acc => this.account = acc,
        complete: () => this.loading = false
      });
  }

  GetBanks(): void{
    this.bankService
      .GetBanks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: bnks => this.banks = bnks
      });
  }

  GetAccountTypes(): void{
    this.accountTypeService
      .GetAccountTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: acctps => this.accountTypes = acctps
      });
  }
}
