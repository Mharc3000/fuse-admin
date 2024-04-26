import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';



export interface UserAccount {
    id:         number;
    username:   string;
    email:      string;
    password:   string;
    agreeTerms: boolean;
    userInfoID: number;
}


  @Injectable({
    providedIn: 'root'
  })
  export class AccountService {
    router: any;
    constructor(private _httpClient: HttpClient){
    }

 

    AddAccount(data): Observable<any> {
        return this._httpClient.post<any>('/api/Create-User', data);
    }
    getUserById(id: number): Observable<any> {
        return this._httpClient.get<any>(`/api/Get-UserInfoID/${id}`);
    }

    getAllUserRoles(): Observable<any> {
      return this._httpClient.get<any>('/api/Get-UserRoles');
    } 
  
  }