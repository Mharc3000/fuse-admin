import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UpdateVisitorService } from './updatevisitor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
    selector     : 'Update-Visitor-Page',
    templateUrl  : './updatevisitor.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UpdateVisitorComponent implements OnInit, OnDestroy {
    visitors: any; // Assuming this will be an object with visitor details
    id: number;
    private routeSubscription: Subscription;
    visitorForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<UpdateVisitorComponent>,
        private http: HttpClient,
        private authService: UpdateVisitorService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.visitorForm = this.formBuilder.group({
            fname: ['', Validators.required],
            mname: [''],
            lname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            purpose: ['', Validators.required],
            checkInDate: [''],
            checkInTime: [''],
            checkOutDate: [''],
            checkOutTime: ['']
        })
    }


    ngOnInit(): void {
        this.initializeForm();
        console.log("visitor data: ", this.data);
        if (this.data && this.data.id) {
            this.id = this.data.id;
            this.GetVisitorById();
        }
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    private initializeForm(): void {
        this.visitorForm = this.formBuilder.group({
            fname: [{ value: '' }],
            mname: [{ value: '' }],
            lname: [{ value: ''}],
            email: [{ value: ''}],
            purpose: [{ value: ''}],
            checkInDate: [{ value: '' }],
            checkInTime: [{ value: '' }],
            checkOutDate: [{ value: '' }],
            checkOutTime: [{ value: '' }]
        });
    }


    async GetVisitorById() {
        try {
            const response: any = await this.authService.getVisitorById(this.id).toPromise();
            this.visitors = response;
            // Update form values using patchValue
            this.visitorForm.patchValue({
                fname: this.visitors.fname,
                mname: this.visitors.mname,
                lname: this.visitors.lname,
                email: this.visitors.email,
                purpose: this.visitors.purpose,
                checkInDate: this.visitors.checkInDate,
                checkInTime: this.visitors.checkInTime,
                checkOutDate: this.visitors.checkOutDate,
                checkOutTime: this.visitors.checkOutTime
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            // Display an error message to the user
        }
    }

    UpdateVisitor() {
        if (this.visitorForm.valid) {
          const visitorData = this.visitorForm.value;
            
           // Manually format the check-in date
           visitorData.checkInDate = this.convertToPhilippineTimeZone(visitorData.checkInDate) 
           visitorData.checkOutDate = this.convertToPhilippineTimeZone(visitorData.checkOutDate) 

          this.authService.updateVisitor(this.data.id, visitorData).subscribe(
            () => {
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Visitor updated successfully!',
              }).then((result) => {
                if (result.isConfirmed) {
                  // Optionally, navigate to another page after successful update
                  // this.router.navigate(['/success']);
                  window.location.reload();
                }
              });
            },
            error => {
              console.error('Error updating visitor:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update visitor. Please try again later.',
                
              });
              window.location.reload();
            }
          );
        } else {
          // Form is invalid, display an error message or take appropriate action
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Form is invalid. Please fill all required fields.',
          });
        }
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

    getFormattedTime(time: string): string {
        if (!time) return null; // Return null if time is not provided
        const [hours, minutes] = time.split(':'); // Split the time string into hours and minutes
        return `${hours}:${minutes}`; // Return formatted time
    }


    convertToPhilippineTimeZone(dateValue: string): string {
        const dateInPhilippineTimeZone = new Date(dateValue);
        const timezoneOffsetInMinutes =
            dateInPhilippineTimeZone.getTimezoneOffset();
        dateInPhilippineTimeZone.setMinutes(
            dateInPhilippineTimeZone.getMinutes() - timezoneOffsetInMinutes
        );

        // Return the converted date in ISO format with only the date part
        return dateInPhilippineTimeZone.toISOString().split('T')[0];
    }

}
