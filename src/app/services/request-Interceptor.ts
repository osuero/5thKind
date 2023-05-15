import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from './spinner/loading.service';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(public loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/assets/i18n/')) {
        this.loadingService.show();
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error occurred:', error);
            return throwError(error);
          }),
          finalize(() => this.loadingService.hide())
        )
    
      } else {
        //ngx-translate TranslateLoader request
        return next.handle(req)
      }
  }
}