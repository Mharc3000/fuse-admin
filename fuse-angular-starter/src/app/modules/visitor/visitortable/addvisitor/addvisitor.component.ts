import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import { AddVisitorService } from './addvisitor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector     : 'Add-Visitor-Modal',
    templateUrl  : './addvisitor.component.html',
    encapsulation: ViewEncapsulation.None
})
export class addvisitorComponent implements OnInit
{
  

    formFieldHelpers: string[] = [''];
    dateTimeControl = new FormControl(new Date());
    addvisitor: FormGroup;
    copyFields: { cc: boolean; bcc: boolean } = {
        cc : false,
        bcc: false
    };
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{align: []}, {list: 'ordered'}, {list: 'bullet'}],
            ['clean']
        ]
    };

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<addvisitorComponent>,
        private _formBuilder: FormBuilder,
        private AddvisitorService: AddVisitorService,
        private router: Router
    )
    {
    }


    getCurrentDate(): string {
        // Get the current date in 'YYYY-MM-DD' format
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[0];
      }
    
      getCurrentTime(): string {
    
        const now = new Date();
        // Set the timezone to Asia/Manila
        const options = { timeZone: 'Asia/Manila' };
        const formattedTime = now.toLocaleTimeString('en-US', options);
        
        // Extract hours, minutes, and AM/PM from the formatted time
        const [time, period] = formattedTime.split(' ');
        const [hours, minutes] = time.split(':');
        
        return `${hours}:${minutes} ${period}`;
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
        this.addvisitor = this._formBuilder.group({
            fname    : ['', [Validators.required]],
            mname     : ['', [Validators.required]],
            lname    : ['', [Validators.required]],
            email: ['', [Validators.compose([Validators.required,Validators.email])]],
            purpose   : ['', [Validators.required]],
            visitation_Sched: [null],
            checkInDate: [this.getCurrentDate(), [Validators.required]],
            checkInTime: [this.getCurrentTime(), [Validators.required]],
            checkOutDate:  [null],
            checkOutTime:  [null],
        });
    }


    AddVisitor(): void {
        if (this.addvisitor.valid) {
          this.AddvisitorService.addVisitor(this.addvisitor.value).subscribe(
            res => {
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Visitor Checked in!',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload(); 
                  this.router.navigate(['visitors']);
                }
              });
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to check in visitor. Please try again later.',
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
        console.log(this.addvisitor.value)
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

}
