import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { BankService } from './../../bank/bank.service';
import { AccountService } from './../account.service';
import { AccountTypeService } from '../../account-types/account-type.service';
import { AccountsComponent } from '../accounts.component';
import { Account } from 'src/app/core/models/account.model';
import { Bank } from 'src/app/core/models/bank.model';
import { AccountType } from 'src/app/core/models/account-type.model';
import { NewAccount } from 'src/app/core/models/new-account.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit, OnDestroy {
  accountForm!: FormGroup;
  account!: Account;
  loading: boolean = true;
  formErrors!: string;

  destroy$ = new Subject<void>();
  banks$!: Observable<Bank[]>;
  accountTypes$!: Observable<AccountType[]>;

  constructor(
    private readonly accountService: AccountService,
    private readonly accountTypeService: AccountTypeService,
    private readonly bankService: BankService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getAccount();
    this.getBanks();
    this.getAccountTypes();

    if (this.account === undefined){
      this.account = new Account();
    }

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

  getAccount(): void{
    this.loading = true;
    var id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    if (id > 0){
      this.accountService
        .getAccount(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: acc => {
            this.account = acc;
            this.fillAccountForm(acc);
          },
          complete: () => this.loading = false
        });
    }
  }

  getBanks(): void{
    this.banks$ = this.bankService.getBanks();
  }

  getAccountTypes(): void{
    this.accountTypes$ = this.accountTypeService.getAccountTypes();
  }

  onSubmit(): void{

    if (this.accountForm.valid){

      let valueSubmit = Object.assign({}, this.accountForm.value)

      var newAccount = new NewAccount(
        valueSubmit['description'],
        valueSubmit['openingBalance'],
        valueSubmit['bankId'],
        valueSubmit['accountTypeId']
      );

      this.accountService
        .postAccount(newAccount)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          error: (errors) => {
            console.log(errors);
          },
          complete: () => this.router.navigate(['accounts'])
        });
    }

  }

  fillAccountForm(acc: Account): void{
    this.accountForm.patchValue({
      description: acc.description,
      openingBalance: acc.openingBalance,
      status: acc.status,
      bankId: acc.bankId,
      accountType: acc.accountTypeId
    });
  }
}
