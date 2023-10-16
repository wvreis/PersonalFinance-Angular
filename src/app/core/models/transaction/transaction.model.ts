import { FormGroup } from "@angular/forms";
import { TransactionStatus } from "../../enums/transaction-status.enum";

export class Transaction {
  id?: number;
  amount?: number;
  date?: Date;
  description?: string;
  status?: TransactionStatus;
  nature?: number;
  accountId?: number;
  account?: string;
  transactionTypeId?: number;
  transactionType?: string;

  constructor(
    id?: number,
    amount?: number,
    date?: Date,
    description?: string,
    status?: number,
    nature?: number,
    accountId?: number,
    transactionTypeId?: number
  ){
    this.id = id,
    this.amount = amount,
    this.date = date,
    this.description = description,
    this.status = status,
    this.nature = nature,
    this.accountId = accountId,
    this.transactionTypeId = transactionTypeId
  }

  fillTransactionWithFormValues(id: number, transactionForm: FormGroup): void{
    let valueSubmit = Object.assign({}, transactionForm.value);

    this.id = id,
    this.amount = valueSubmit['amount'];
    this.date = valueSubmit['date'];
    this.description = valueSubmit['description'];
    this.status = valueSubmit['status'];
    this.nature = valueSubmit['nature'];
    this.accountId = valueSubmit['accountId'];
    this.transactionTypeId = valueSubmit['transactionTypeId'];
  }
}
