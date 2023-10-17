import { TransactionType } from 'src/app/core/models/transaction-type/transaction-type.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionTypeService {
  constructor(private readonly http: HttpClient) { }

  getTransactionTypes(): Observable<TransactionType[]> {
    return this.http
      .get('transactionTypes/GetAllTransactionTypes')
      .pipe(map((transactionTypes) => <TransactionType[]>transactionTypes));
  }
}
