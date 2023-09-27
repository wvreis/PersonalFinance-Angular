import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Account } from 'src/app/core/models/account/account.model';
import { AddAccount } from 'src/app/core/models/account/add-account.model';
import { TagContentType } from '@angular/compiler';
import { JsonPipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AccountService {
    accounts!: Account[];
    params!: HttpParams;

    constructor(private http: HttpClient) { }

    getAccount(id: number): Observable<Account> {
        this.params = new HttpParams().set('id', id);

        return this.http
            .get('accounts/getAccount', { params: this.params })
            .pipe(map((account) => <Account>account));
    }

    getAccounts(searchInfo: string): Observable<Account[]> {
        this.params = new HttpParams().set('searchInfo', searchInfo);

        return this.http
            .get('accounts/getAccounts', { params: this.params })
            .pipe(map((accounts) => <Account[]>accounts));
    }

    postAccount(account: AddAccount): Observable<any> {
        return this.http
            .post('accounts/PostAccount',JSON.stringify(account), {headers: {'content-type': 'application/json'}})
            .pipe(map(resp => resp));
    }

    putAccount(account: Account): Observable<any> {
        return this.http
            .put('accounts/PutAccount', JSON.stringify(account), {headers: {'content-type': 'application/json'}})
            .pipe(map(resp => resp));
    }

}
