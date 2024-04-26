import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';





  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAccountService {
    router: any;
    constructor(private _httpClient: HttpClient){
    }

    getUserAccountId(id: number): Observable<any> {
        return this._httpClient.get<any>(`/api/Get-User-Account/${id}`);
    }

    updateAccount(id: number, userData) {
      return this._httpClient.put<any>(`/api/Update/Account/${id}`, userData);
    }
  
    

  }