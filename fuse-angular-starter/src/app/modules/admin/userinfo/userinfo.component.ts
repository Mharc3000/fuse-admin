import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UserInfoService } from './userinfo.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface UserInfo {
    id:          number;
    fname:       string;
    mname:       string;
    lname:       string;
    position:    string;
    userImgPath: string;
    useraccount: Useraccount;
    isActive:    boolean;
}

export interface Useraccount {
    id:         number;
    username:   string;
    email:      string;
    password:   string;
    agreeTerms: null;
    userInfoID: number;
}

@Component({
    selector     : 'userinfo',
    templateUrl  : './userinfo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UserinfoComponent implements OnInit, OnDestroy
{
    userInfo: UserInfo; 

    /**
     * Constructor
     */
    constructor( private _userService: UserInfoService,)
    {
     
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    
    ngOnInit(): void {
        this.loadUserInfo(); 
    }

    private _unsubscribeAll: Subject<any> = new Subject<any>();


    loadUserInfo(): void {

        this._userService.getUserInfo()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((userInfo: UserInfo) => {
                this.userInfo = userInfo;
                console.log(this.userInfo)
                // Assign the fetched user info to userInfo variable
        });

    
    }






}
