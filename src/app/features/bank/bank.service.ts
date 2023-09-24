import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Bank } from 'src/app/core/models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  bank!: Bank[];

  constructor(private http: HttpClient) { }

  getBanks(): Observable<Bank[]>{
    return this.http
      .get('banks/getAllBanks')
      .pipe(map((banks) => <Bank[]>banks));
  }
}
