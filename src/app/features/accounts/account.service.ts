import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';
import { NewAccount } from 'src/app/core/models/new-account.model';
import { TagContentType } from '@angular/compiler';

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

    postAccount(account: NewAccount): Observable<any> {
        console.log(JSON.stringify(account));

        return this.http
            .post('accounts/PostAccount',JSON.stringify(account), {headers: {'content-type': 'application/json'}})
            .pipe(map(resp => resp))
    }
}
