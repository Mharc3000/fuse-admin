import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';





  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserService {
    router: any;
    constructor(private _httpClient: HttpClient){
    }

    getUserById(id: number): Observable<any> {
        return this._httpClient.get<any>(`/api/Get-UserInfoID/${id}`);
    }

    updateUser(id: number, userData) {
      return this._httpClient.put<any>(`/api/Update/User/${id}`, userData);
    }
  
    postEventImage(id: number, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('ImageFile', file, file.name);
  
        return this._httpClient.post<any>(
            `api/Upload/User-Profile/${id}`,
            formData
        );
    }

  }