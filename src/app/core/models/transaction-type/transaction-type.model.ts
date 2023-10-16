import { TransactionNature } from "../../enums/transaction-nature.enum";

export class TransactionType {
    id?: number;
    description?: string;
    transactionNature?: TransactionNature;    
    transactionGroupId?: number;
    transactionGroup?: string;
}