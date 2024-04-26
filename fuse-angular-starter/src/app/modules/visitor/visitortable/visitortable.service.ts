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
  export class VisitorService {
    router: any;
    constructor(private _httpClient: HttpClient){
    }

    getAllVisitors(): Observable<any> {
     return this._httpClient.get<any>('/api/Get-Visitors');
    }

    // // GetView(Visitors: any) {
    // //   console.log(Visitors.id); 
    // //   this.router.navigate(['/viewinfo/'+ Visitors.id]);


    // // }
    updateVisitor(id: number, visitorData) {
      return this._httpClient.put<any>(`/api/Update-Visitors/${id}`, visitorData);
    }
  
    
    deleteVisitor(id: any): Observable<any> {
      return this._httpClient.delete(`/api/Delete-Visitors/${id}`);
    }
  


  }