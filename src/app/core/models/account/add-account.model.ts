export class AddAccount {    
    description!: string;
    openingBalance!: number;    
    bankId!: number;
    accountTypeId!: number;

    constructor(
        desc: string,
        openBal: number,    
        bnkId: number,
        accTypeId: number
    ) {
        this.description = desc;
        this.openingBalance = openBal;
        this.bankId = bnkId;
        this.accountTypeId = accTypeId;    
    }
}