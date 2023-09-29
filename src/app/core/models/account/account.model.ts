import { FormGroup } from "@angular/forms";

export class Account {
  id?: number;
  description?: string;
  openingBalance?: number;
  status?: boolean = true;
  bankId?: number;
  bank?: string;
  accountTypeId?: number;
  accountType?: string;

  constructor(
    id?: number,
    description?: string,
    openingBalance?: number,
    status?: boolean,
    bankId?: number,
    bank?: string,
    accountTypeId?: number,
    accountType?: string
  ) {
    this.id = id;
    this.description = description;
    this.openingBalance = openingBalance;
    this.status = status;
    this.bankId = bankId;
    this.bank = bank;
    this.accountTypeId = accountTypeId;
    this.accountType = accountType;
  }

  fillAccountWithFormValues(id: number, accountForm: FormGroup): void {
    let valueSubmit = Object.assign({}, accountForm.value);

    this.id = id;
    this.accountTypeId = valueSubmit['accountTypeId'];
    this.bankId = valueSubmit['bankId'];
    this.description = valueSubmit['description'];
    this.openingBalance = valueSubmit['openingBalance'];
    this.status = valueSubmit['status'];
  }
}
