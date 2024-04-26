import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { UpdateAccountService } from './updateaccount.service';
import { UserRole } from '../addaccount/addaccount.component';

export interface Userlist {
    id:       number;
    fname:    string;
    mname:    string;
    lname:    string;
    position: string;
    userImgPath: string;
}


export interface Useraccount {
    id:         number;
    username:   string;
    email:      string;
    password:   string;
    agreeTerms: boolean;
    userInfoID: null;
    userInfo:   null;
    roleID:     null;
}



@Component({
    selector     : 'Update-user-account-Page',
    templateUrl  : './updateaccount.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UpdateUserAccountComponent implements OnInit, OnDestroy {
    Useraccount: any; // Assuming this will be an object with visitor details
    id: number;
    private routeSubscription: Subscription;
    userForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<UpdateUserAccountComponent >,
        private http: HttpClient,
        private authService: UpdateAccountService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Userlist
    ) {
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            roleID: ['', Validators.required],
           
        })
    }
    
    userRoles: UserRole[] = [
        { id: 1, roleDescription: 'Admin', isActive: true  },
        { id: 2, roleDescription: 'User', isActive: true  },
        // Add more roles as needed
    ];

    ngOnInit(): void {
        this.initializeForm();
        console.log("User data: ", this.data);
        if (this.data && this.data.id) {
            this.id = this.data.id;
            this.GetUserAccountById();
        }
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    private initializeForm(): void {
        this.userForm = this.formBuilder.group({
            username: [{ value: '' }],
            email: [{ value: '' }],
            password: [{ value: ''}],
            roleID: [{ value: ''}],
        });
    }


    async GetUserAccountById() {
        try {
            const response: any = await this.authService.getUserAccountId(this.id).toPromise();
            this.Useraccount = response;
            // Update form values using patchValue
            this.userForm.patchValue({
                username: this.Useraccount.username,
                email: this.Useraccount.email,
                password: this.Useraccount.password,
                roleID: this.Useraccount.roleID
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            // Display an error message to the user
        }
    }

    // UpdateVisitor() {
    //     if (this.visitorForm.valid) {
    //       const visitorData = this.visitorForm.value;
        

    //       this.authService.updateVisitor(this.data.id, visitorData).subscribe(
    //         () => {
    //           Swal.fire({
    //             icon: 'success',
    //             title: 'Success!',
    //             text: 'Visitor updated successfully!',
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               // Optionally, navigate to another page after successful update
    //               // this.router.navigate(['/success']);
    //               window.location.reload();
    //             }
    //           });
    //         },
    //         error => {
    //           console.error('Error updating visitor:', error);
    //           Swal.fire({
    //             icon: 'error',
    //             title: 'Error!',
    //             text: 'Failed to update visitor. Please try again later.',
                
    //           });
    //           window.location.reload();
    //         }
    //       );
    //     } else {
    //       // Form is invalid, display an error message or take appropriate action
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error!',
    //         text: 'Form is invalid. Please fill all required fields.',
    //       });
    //     }
    // }

    UpdateUserInfo(): void {
        
    
        const userData = {
            username: this.userForm.get('username').value,
            email: this.userForm.get('email').value,
            password: this.userForm.get('password').value,
            roleID: this.userForm.get('roleID').value,
        };
    
        this.authService.updateAccount(this.data.id, userData).subscribe((res) => {
            // Handle response if needed
            let timerInterval;
            Swal.fire({
                title: 'Updated',
                html: 'Close in <b></b> milliseconds.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector('b');
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    window.location.reload();
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.reload();
                }
            });
        });
    }
    
    
 

    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();
        // Close the dialog
        this.matDialogRef.close();
    }

    saveAsDraft(): void {
        // Implement saveAsDraft logic if needed
    }

   

}
