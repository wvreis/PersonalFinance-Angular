import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction/transaction.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions!: Transaction[];
  params!: HttpParams;

  constructor(private http: HttpClient) {}

  getTransactions(searchInfo: string):Observable<Transaction[]> {
    this.params = new HttpParams().set('searchInfo', searchInfo);

    return this.http
      .get('transactions/GetTransactions', { params: this.params })
      .pipe(map((transactions) => <Transaction[]>transactions));
  }
}
