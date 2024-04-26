import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountService } from './addaccount.service';

export interface Userinfo {
    id:          number;
    fname:       string;
    mname:       string;
    lname:       string;
    position:    string;
    useraccount: Useraccount;
    isActive:    boolean;
}

export interface Useraccount {
    id:         number;
    username:   string;
    email:      string;
    password:   string;
    agreeTerms: boolean;
    userInfoID: number;
    RoleID: number;
}

// Generated by https://quicktype.io

export interface UserRole {
    id:              number;
    roleDescription: string;
    isActive:        boolean;
}




@Component({
    selector     : 'Add-Account-Modal',
    templateUrl  : './addaccount.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush // Change detection strategy
})
export class AddUserAccountComponent implements OnInit, AfterViewInit {
    id: number;
    dataSource: Userinfo;
    addAccount: FormGroup;

    userRoles: UserRole[] = [
        { id: 1, roleDescription: 'Admin', isActive: true  },
        { id: 2, roleDescription: 'User', isActive: true  },
        // Add more roles as needed
    ];

    constructor(
        public matDialogRef: MatDialogRef<AddUserAccountComponent>,
        private _formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private cdr: ChangeDetectorRef // ChangeDetectorRef for manual change detection
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        console.log("User data: ", this.data);
        if (this.data && this.data.id) {
            this.id = this.data.id;
        }
    }

    ngAfterViewInit(): void {
        if (this.id) {
            this.GetUserById(this.id);
        }
    }

    private initializeForm(): void {
        this.addAccount = this._formBuilder.group({
            username    : ['', [Validators.required]],
            email     : ['', [Validators.required]],
            password    : ['', [Validators.required]],
            userInfoID: [this.data.id],
            RoleID    : ['', [Validators.required]],
        });
    }

    GetUserById(id: number): void {
        this.accountService.getUserById(id).subscribe((res: Userinfo[]) => {
            // Manually trigger change detection
            this.cdr.detectChanges();
        });
    }

    AddUserAcc(): void {
        if (this.addAccount && this.addAccount.valid) {
            this.accountService.AddAccount(this.addAccount.value).subscribe(
                res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'User Account added Successfully!',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                            this.router.navigate(['userlist']);
                        }
                    });
                },
                error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to add user account. Please try again later.',
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please enter valid data.',
            });
        }
        console.log(this.addAccount.value)
    }

    saveAndClose(): void {
        this.matDialogRef.close();
    }

    discard(): void {
        // Add discard logic if needed
    }
}
