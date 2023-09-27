import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { BankService } from './../../bank/bank.service';
import { AccountService } from './../account.service';
import { AccountTypeService } from '../../account-types/account-type.service';
import { Account } from 'src/app/core/models/account/account.model';
import { Bank } from 'src/app/core/models/bank/bank.model';
import { AccountType } from 'src/app/core/models/account-type/account-type.model';
import { AddAccount } from 'src/app/core/models/account/add-account.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
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
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.routeId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getAccount();
    this.getBanks();
    this.getAccountTypes();



    this.accountForm = this.formBuilder.group({
      description: [this.account.description, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      openingBalance: [this.account.openingBalance],
      status: [this.account.status],
      bankId: [this.account.bankId, Validators.required],
      accountTypeId: [this.account.accountTypeId, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAccount(): void {
    this.loading = true;

    if (this.routeId > 0) {
      this.accountService
        .getAccount(this.routeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: acc => {
            this.account = acc;
            this.fillAccountForm(acc);
          },
          complete: () => this.loading = false
        });
    }
    else {
        this.loading = false;
    }
  }

  getBanks(): void {
    this.bankService
      .getBanks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: bnks => this.banks = bnks
      });
  }

  getAccountTypes(): void {
    this.accountTypeService
      .getAccountTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: acctps => this.accountTypes = acctps
      });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      if (this.routeId == 0) {
        this.addAccount();
      }
      else {
        this.updateAccount();
      }
    }

  }

  addAccount(): void {
    let valueSubmit = Object.assign({}, this.accountForm.value)

    var newAccount = new AddAccount(
      valueSubmit['description'],
      valueSubmit['openingBalance'],
      valueSubmit['bankId'],
      valueSubmit['accountTypeId']
    );

    this.accountService
      .postAccount(newAccount)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (errors) => console.log(errors),
        complete: () => this.router.navigate(['accounts'])
      });
  }

  updateAccount(): void {
    this.fillAccountWithFormValues();

    this.accountService
      .putAccount(this.account)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (errors) => console.log(errors),
        complete: () => this.router.navigate(['accounts'])
      })
  }

  fillAccountForm(acc: Account): void {
    this.accountForm.patchValue({
      description: acc.description,
      openingBalance: acc.openingBalance,
      status: acc.status,
      bankId: acc.bankId,
      accountTypeId: acc.accountTypeId
    });

  }

  fillAccountWithFormValues(): void{
    let valueSubmit = Object.assign({}, this.accountForm.value)

    this.account.accountTypeId = valueSubmit['accountTypeId']
    this.account.bankId = valueSubmit['bankId']
    this.account.description = valueSubmit['description']
    this.account.openingBalance = valueSubmit['openingBalance']
    this.account.status = valueSubmit['status']
  }
}
