import { FormGroup } from "@angular/forms";

export class AddAccount {
  description?: string;
  openingBalance?: number;
  bankId?: number;
  accountTypeId?: number;

  constructor(
    desc?: string,
    openBal?: number,
    bnkId?: number,
    accTypeId?: number,
  ) {
    this.description = desc;
    this.openingBalance = openBal;
    this.bankId = bnkId;
    this.accountTypeId = accTypeId;
  }

  fillPropertiesFromForm(accountForm: FormGroup) {
    let valueSubmit = Object.assign({}, accountForm.value);

    this.description = valueSubmit['description'];
    this.openingBalance = valueSubmit['openingBalance'];
    this.bankId = valueSubmit['bankId'];
    this.accountTypeId = valueSubmit['accountTypeId'];
  }
}
