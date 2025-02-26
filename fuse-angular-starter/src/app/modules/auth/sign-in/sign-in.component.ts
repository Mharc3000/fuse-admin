import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };

    signInForm: FormGroup;
    showAlert: boolean = false;
    isSmallScreen: boolean

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private breakpointObserver: BreakpointObserver

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
        this.signInForm = this._formBuilder.group({

            username     : ['', Validators.required],
            password  : ['', Validators.required],

        });
        this.isSmallScreen = this.breakpointObserver.isMatched(Breakpoints.XSmall);

  this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                (res: any) => {
                   // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect'
                  // Navigate to the redirect url
                  this._router.navigate(['/home']);
                //   this.saveUserCredentialToLocalStorage();


                },
                (response) => {

                    // Re-enable the form
                    this.signInForm.enable();
                    

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: `${response.error.message}`
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    // private saveUserCredentialToLocalStorage(): void {
    //     localStorage.setItem(
    //         'userCredentials',
    //         JSON.stringify(this.signInForm.value)
    //     );
    // }
}
