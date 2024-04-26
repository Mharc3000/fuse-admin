import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


export interface Visitors {
    id:           Number;
    fname:        string;
    mname:        string;
    lname:        string;
    email:        string;
    purpose:      string;
    checkInDate:  string;
    checkInTime:  string;
    checkOutDate: string;
    checkOutTime: string;
  }


  @Injectable({
    providedIn: 'root'
  })
  export class ViewVisitorService {
    constructor(private _httpClient: HttpClient){
    }

    getVisitorById(id: number): Observable<any> {
        return this._httpClient.get<any>(`/api/Get-Visitors/${id}`);
    }

  }