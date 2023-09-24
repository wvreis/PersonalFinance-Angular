export class Account {
    id!: number;
    description!: string;
    openingBalance!: number;
    status: boolean = true;
    bankId!: number;
    bank!: string;
    accountTypeId!: number;
    accountType!: string;
}