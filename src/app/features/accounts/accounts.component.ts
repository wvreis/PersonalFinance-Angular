import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Account } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts$!: Observable<any>;

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.accounts$ = this.http.get('accounts');
  }  
  
  ngOnDestroy(): void {
    
  }
}
