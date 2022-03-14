import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('AuthorizationInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthorizationInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationInterceptor,
          multi: true,
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: AuthorizationInterceptor = TestBed.inject(
      AuthorizationInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it('should set token', () => {
    http.get('/test').subscribe();
    const request = controller.expectOne('/test');
    expect(request.request.headers.get('Authorization')).toEqual(
      `token ${environment.token}`
    );
  });
});
