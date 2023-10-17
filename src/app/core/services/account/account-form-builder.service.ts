import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../models/account/account.model';

@Injectable({ providedIn: 'root' })
export class AccountFormBuilderService {

  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  buildFormGroup(account: Account): FormGroup {
    return this.formBuilder.group({
      description: [
        account.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],        
      ],
      openingBalance: [account.openingBalance],
      status: [account.status],
      bankId: [account.bankId, Validators.required],
      accountTypeId: [account.accountTypeId, Validators.required],
    });
  }

  fillAccountForm(accForm: FormGroup, acc: Account): void {
    accForm.patchValue({
      description: acc.description,
      openingBalance: acc.openingBalance,
      status: acc.status,
      bankId: acc.bankId,
      accountTypeId: acc.accountTypeId,
    });
  }
}
