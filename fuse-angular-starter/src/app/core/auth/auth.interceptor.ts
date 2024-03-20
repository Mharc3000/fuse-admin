import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private _authService: AuthService) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();

        if (this._authService.accessToken) {
            newReq = req.clone({
                headers: req.headers.set(
                    'Authorization',
                    'Bearer ' + this._authService.accessToken

                ),
            });

            console.log(this._authService.accessToken)
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                // Catch "401 Unauthorized" responses
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    // Sign out
                    this._authService.signOut();
                    console.log(error);
                    // // Reload the app
                    location.reload();
                }

                return throwError(error);
            })
        );
    }

    addTokenHeader(request: HttpRequest<any>, token: any) {
        return request.clone({
            headers: request.headers.set('Authorization', 'bearer' + token),
        });
    }
}