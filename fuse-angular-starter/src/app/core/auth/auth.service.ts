import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

export interface UserAuth {
    succeeded: boolean;
    message:   string;
    user:      User;
    token:     string;
  }
  
  export interface User {
    id:         number;
    username:   string;
    email:      string;
    password:   string;
    agreeTerms: boolean;
  }
  



@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private _userRole: number;

    user: User;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            // If a token is found, set it in your service or wherever needed
            this.accessToken = storedToken;
            this._authenticated = true;
        }

        this.user = this.getUser(storedToken);

        const authuser = this.getUser(storedToken);
        // console.log(this.user);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: {
        username: string;
        password: string;
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient
            .post('/api/login', credentials)
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    localStorage.setItem('accessToken', response.token);
                    // Set the authenticated flag to true

                    console.log(response);
                    this._authenticated = true;
                    // Set the user role
                    // console.log(response.user.roleID);

            

                    this.user = this.getUser(response.token);

                    // console.log(this.user);

                    // console.log(this._userRole);
                    // this.userRole = response.user.roleID;
                    // console.log(this.userRole);

                    // console.log(response.user.roleID);

            

                    this.user = this.getUser(response.token)

                    // console.log(this.user);

                    // console.log(this._userRole);


                    // this.isUserRole(response.user.roleID)
                    // this._userService.get().subscribe((res)=>{
                    //     console.log(res)
                    // })


                    return of(response);
                })
            );
    }

    private getUser(token: string): User | null {
        if (!token) {
            return null;
        }
        return JSON.parse(atob(token.split('.')[1])) as User;
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient
            .post('api/auth/refresh-access-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.accessToken;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }


    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
