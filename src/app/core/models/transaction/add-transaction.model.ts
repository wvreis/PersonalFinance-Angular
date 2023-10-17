import { FormGroup } from "@angular/forms";
import { TransactionNature } from "../../enums/transaction-nature.enum";
import { TransactionStatus } from "../../enums/transaction-status.enum";

export class AddTransaction {
  amount?: number;
  date?: Date = new Date();
  description?: string;
  status?: TransactionStatus;
  nature?: TransactionNature;
  accountId?: number;
  transactionTypeId?: number;

  constructor(
    amount?: number,
    date?: Date,
    description?: string,
    status?: TransactionStatus,
    nature?: TransactionNature,
    accountId?: number,
    transactionTypeId?: number,
  ) {
    this.amount = amount;
    this.date = date;
    this.description = description;
    this.status = status;
    this.nature = nature;
    this.accountId = accountId;
    this.transactionTypeId = transactionTypeId;
  }

  fillPropertiesFromForm(transactionForm: FormGroup) {
    let valueSubmit = Object.assign({}, transactionForm.value);

    this.amount = valueSubmit['amount'];
    this.date = valueSubmit['date'];
    this.description = valueSubmit['description'];
    this.status = valueSubmit['status'];
    this.nature = valueSubmit['nature'];
    this.accountId = valueSubmit['accountId'];
    this.transactionTypeId = valueSubmit['transactionTypeId'];
  }
}
