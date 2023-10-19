import { Injectable } from '@angular/core';
import { Transaction } from '../../models/transaction/transaction.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AddTransaction } from '../../models/transaction/add-transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  transactions!: Transaction[];
  params!: HttpParams;

  constructor(private http: HttpClient) {}

  getTransactions(searchInfo: string, startDate: string | undefined, endDate: string | undefined):Observable<Transaction[]> {
    this.params = new HttpParams()
      .set('searchInfo', searchInfo)
      .append(startDate !== undefined ? 'startDate' : '', startDate != undefined ? startDate : '')
      .append(endDate !== undefined ? 'endDate' : '', endDate != undefined ? endDate : '');

    return this.http
      .get('transactions/GetTransactions', { params: this.params })
      .pipe(map((transactions) => <Transaction[]>transactions));
  }

  getTransaction(id: number): Observable<Transaction>{
    this.params = new HttpParams().set('id', id);

    return this.http
      .get('transactions/GetTransaction', { params: this.params })
      .pipe(map((transaction) => <Transaction>transaction));
  }

  postTransaction(transaction: AddTransaction): Observable<any> {
    return this.http
      .post('transactions/PostTransaction', JSON.stringify(transaction), { headers: { 'content-type': 'application/json' } })
      .pipe(map(resp => resp));
  }

  putTransaction(transaction: Transaction): Observable<any> {
    return this.http
      .put('transactions/PutTransaction', JSON.stringify(transaction), { headers: { 'content-type': 'application/json' } })
      .pipe(map(resp => resp));
  }
}
