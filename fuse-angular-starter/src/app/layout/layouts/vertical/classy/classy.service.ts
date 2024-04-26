import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';




  @Injectable({
    providedIn: 'root'
  })
  export class ClassyService {
    router: any;
    constructor(private _httpClient: HttpClient){
    }

    getUserInfo(): Observable<any> {
     return this._httpClient.get<any>('/api/UserInfomation/Claims');
    }
  }