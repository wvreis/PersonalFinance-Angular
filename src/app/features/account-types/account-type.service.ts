import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccountType } from 'src/app/core/models/account-type.model';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  accountType!: AccountType[];

  constructor(private http: HttpClient) { }

  GetAccountTypes(): Observable<AccountType[]>{
    return this.http
      .get('accountTypes/getAllAccountsTypes')
      .pipe(map((accountTypes) => <AccountType[]>accountTypes));
  }
}
