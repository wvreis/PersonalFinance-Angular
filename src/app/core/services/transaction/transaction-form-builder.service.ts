import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Transaction } from '../../models/transaction/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionFormBuilderService {
  constructor(private readonly formBuilder: FormBuilder) { }

  buildFormGroup(transaction: Transaction): FormGroup {
    return this.formBuilder.group({
      amount: [transaction.amount, [Validators.required, Validators.min(0.01)]],
      date: [transaction.date, [Validators.required]],
      description: [
        transaction.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
      status: [transaction.status],
      nature: [transaction.nature, Validators.required],
      accountId: [transaction.accountId, Validators.required],
      transactionTypeId: [transaction.transactionTypeId, Validators.required]
    });
  }

  fillTransactionForm(transactionsForm: FormGroup, transaction: Transaction): void {
    transactionsForm.patchValue({
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description,
      status: transaction.status,
      nature: transaction.nature,
      accountId: transaction.accountId,
      transactionTypeId: transaction.transactionTypeId
    });
  }
}
