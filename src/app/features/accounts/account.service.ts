import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';

@Injectable({providedIn: 'root'})
export class AccountService {
    accounts!: Account[];
    params!: HttpParams;

    constructor(private http: HttpClient) { }

    GetAccount(id: number): Observable<Account>{
        this.params = new HttpParams().set('id', id);

        return this.http
            .get('accounts/getAccount', { params: this.params })
            .pipe(map((account) => <Account>account));
    }
    
    GetAccounts(searchInfo: string): Observable<Account[]>{
        this.params = new HttpParams().set('searchInfo', searchInfo);

        return this.http
            .get('accounts/getAccounts', { params: this.params })
            .pipe(map((accounts) => <Account[]>accounts));
    }  
}