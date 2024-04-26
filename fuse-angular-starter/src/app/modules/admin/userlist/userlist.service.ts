import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


export interface Userlist {
  id:       number;
  fname:    string;
  mname:    string;
  lname:    string;
  position: string;
}



  @Injectable({
    providedIn: 'root'
  })
  export class UserlistService {
    router: any;
    constructor(private _httpClient: HttpClient){
    }

    getAllUser(): Observable<any> {
     return this._httpClient.get<any>('/api/Get-UserInfo');
    }


    DeactivateDeleteUser(id: any): Observable<any> {
      return this._httpClient.delete(`/api/Delete/Deactivate/${id}`);
    }

    


  }