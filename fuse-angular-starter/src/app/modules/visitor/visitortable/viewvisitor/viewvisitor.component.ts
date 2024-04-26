import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewVisitorService } from './viewvisitor.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'view-visitor-page',
    templateUrl: './viewvisitor.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ViewVisitorComponent implements OnInit, OnDestroy {
    visitors: any; // Assuming this will be an object with visitor details
    id: number;
    private routeSubscription: Subscription;
    visitorForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<ViewVisitorComponent>,
        private http: HttpClient,
        private authService: ViewVisitorService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
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
            fname: [{ value: '', disabled: true }],
            mname: [{ value: '', disabled: true }],
            lname: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            purpose: [{ value: '', disabled: true }],
            checkInDate: [{ value: '', disabled: true }],
            checkInTime: [{ value: '', disabled: true }],
            checkOutDate: [{ value: '', disabled: true }],
            checkOutTime: [{ value: '', disabled: true }]
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
