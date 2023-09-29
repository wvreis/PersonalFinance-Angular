import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { BankService } from './../../bank/bank.service';
import { AccountService } from '../../../core/services/account.service';
import { AccountTypeService } from '../../../core/services/account-type.service';
import { Account } from 'src/app/core/models/account/account.model';
import { Bank } from 'src/app/core/models/bank/bank.model';
import { AccountType } from 'src/app/core/models/account-type/account-type.model';
import { AddAccount } from 'src/app/core/models/account/add-account.model';
import { AccountFormBuilderService } from 'src/app/core/services/account-form-builder.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
})
export class AccountFormComponent implements OnInit, OnDestroy {
  accountForm!: FormGroup;
  account: Account = new Account();
  loading: boolean = true;
  formErrors!: string;
  routeId!: number;

  destroy$ = new Subject<void>();
  banks!: Bank[];
  accountTypes!: AccountType[];

  constructor(
    private readonly accountService: AccountService,
    private readonly accountTypeService: AccountTypeService,
    private readonly bankService: BankService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly accountFormBuilderService: AccountFormBuilderService
  ) {}

  ngOnInit(): void {
    this.routeId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadObjects();
    this.accountForm = this.accountFormBuilderService.buildFormGroup(this.account);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadObjects(): void{
    forkJoin([
      this.bankService.getBanks(),
      this.accountTypeService.getAccountTypes(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: [bnks: Bank[], acctps: AccountType[]]) => {
          this.getBanks(value['0']);
          this.getAccountTypes(value['1']);
          this.getAccount();
        },
        complete: () => (this.loading = false),
      });
  }

  getAccount(): void {
    if (this.routeId > 0) {
      this.accountService
        .getAccount(this.routeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (acc) => {
            this.accountFormBuilderService.fillAccountForm(this.accountForm, acc);
          },
        });
    }
  }

  getBanks(bnks: Bank[]): void {
    this.banks = bnks;
  }

  getAccountTypes(acctps: AccountType[]): void {
    this.accountTypes = acctps;
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      if (this.routeId == 0) {
        this.addAccount();
      } else {
        this.updateAccount();
      }
    }
  }

  addAccount(): void {
    let newAccount = new AddAccount();
    newAccount.fillProperties(this.accountForm);

    this.accountService
      .postAccount(newAccount)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (errors) => console.log(errors),
        complete: () => this.router.navigate(['accounts']),
      });
  }

  updateAccount(): void {
    this.account.fillAccountWithFormValues(this.routeId, this.accountForm);

    this.accountService
      .putAccount(this.account)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (errors) => console.log(errors),
        complete: () => this.router.navigate(['accounts']),
      });
  }
}
