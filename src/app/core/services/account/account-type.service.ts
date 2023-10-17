import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AccountType } from 'src/app/core/models/account-type/account-type.model';

@Injectable({ providedIn: 'root'})
export class AccountTypeService {
  constructor(private http: HttpClient) { }

  getAccountTypes(): Observable<AccountType[]> {
    return this.http
      .get('accountTypes/getAllAccountsTypes')
      .pipe(map((accountTypes) => <AccountType[]>accountTypes));
  }
}
