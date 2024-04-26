import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddUserService } from './adduser.service';


@Component({
    selector     : 'Add-user-Modal',
    templateUrl  : './adduser.component.html',
    encapsulation: ViewEncapsulation.None
})
export class adduserComponent implements OnInit
{
  

    formFieldHelpers: string[] = [''];
    dateTimeControl = new FormControl(new Date());
    adduser: FormGroup;

    

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<adduserComponent>,
        private _formBuilder: FormBuilder,
        private AddUserService: AddUserService ,
        private router: Router
    )
    {
    }


    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.adduser = this._formBuilder.group({
            fname    : ['', [Validators.required]],
            mname     : ['', [Validators.required]],
            lname    : ['', [Validators.required]],
            position: ['', [Validators.required]],
        });
    }


      AddUser(): void {
        const formValue = {
            form: this.adduser.value,
            image: this.selectedFile,
        };
    
        this.matDialogRef.close(formValue);
    
        this.matDialogRef.afterClosed().subscribe((result) => {
            if (result !== 'undefined') {
                const formValue = result;
    
                console.log(formValue);
    
                this.AddUserService.addUser(formValue.form).subscribe((res) => { // subscribe instead of then
                    console.log(res);
                    let timerInterval;
                    Swal.fire({
                        title: 'Will Added',
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
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer');
                            // window.location.reload();
                            this.uploadImage(res.id, formValue.image);
                        }
                    });
                });
            }
        });
    
        console.log(this.adduser.value);
    }
    
    

      uploadImage(id: number, file: File) {
        this.AddUserService.postEventImage(id, file).subscribe((res) => {
            window.location.reload();
        });
      }
  
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the copy field with the given field name
     *
  
    /**
     * Save and close
     */
    saveAndClose(): void
    {
       
        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void
    {

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
