import { FormBuilder } from '@angular/forms';
import { AccountService } from './../account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit, OnDestroy {
  account!: Account;
  loading: boolean = true;
  destroy$ = new Subject<void>();

  constructor(
    private readonly accountService: AccountService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.GetAccount();

    
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
}
