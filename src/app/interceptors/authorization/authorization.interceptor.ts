import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: any
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: { Authorization: `token ${environment.token}` },
    });
    return next.handle(request);
  }
}
