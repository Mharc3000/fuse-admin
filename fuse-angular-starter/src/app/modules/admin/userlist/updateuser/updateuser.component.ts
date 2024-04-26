import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { UpdateUserService } from './updateuser.service';

export interface Userlist {
    id:       number;
    fname:    string;
    mname:    string;
    lname:    string;
    position: string;
    userImgPath: string;
}


@Component({
    selector     : 'Update-user-Page',
    templateUrl  : './updateuser.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UpdateUserComponent implements OnInit, OnDestroy {
    userList: any; // Assuming this will be an object with visitor details
    id: number;
    private routeSubscription: Subscription;
    userForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<UpdateUserComponent >,
        private http: HttpClient,
        private authService: UpdateUserService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Userlist
    ) {
        this.userForm = this.formBuilder.group({
            fname: ['', Validators.required],
            mname: [''],
            lname: ['', Validators.required],
            position: ['', Validators.required],
           
        })
    }
    

    ngOnInit(): void {
        this.initializeForm();
        console.log("User data: ", this.data);
        if (this.data && this.data.id) {
            this.id = this.data.id;
            this.GetUserById();
        }
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    private initializeForm(): void {
        this.userForm = this.formBuilder.group({
            fname: [{ value: '' }],
            mname: [{ value: '' }],
            lname: [{ value: ''}],
            position: [{ value: ''}],
        
        });
    }


    async GetUserById() {
        try {
            const response: any = await this.authService.getUserById(this.id).toPromise();
            this.userList = response;
            // Update form values using patchValue
            this.userForm.patchValue({
                fname: this.userList.fname,
                mname: this.userList.mname,
                lname: this.userList.lname,
                position: this.userList.position,
                userImgPath: this.userList.userImgPath
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
        if (this.selectedFile) {
            this.authService.postEventImage(this.data.id, this.selectedFile).subscribe((res) => {
                // Handle response if needed
                window.location.reload();
            });
        }
    
        const userData = {
            fname: this.userForm.get('fname').value,
            mname: this.userForm.get('mname').value,
            lname: this.userForm.get('lname').value,
            position: this.userForm.get('position').value,
        };
    
        this.authService.updateUser(this.data.id, userData).subscribe((res) => {
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

    selectedFile: File;
    previewImageUrl: string;

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0] as File;

        const file = this.selectedFile;

        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed.');
            return;
        }

        if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previewImageUrl = e.target.result;
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    removePreviewImage(): void {
        this.selectedFile = null;
        this.previewImageUrl = null;
    }

}
