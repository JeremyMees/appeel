import { TestBed } from '@angular/core/testing';
import { BranchesService } from './branches.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('BranchesService', () => {
  let service: BranchesService;
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get']),
        },
      ],
    });
    service = TestBed.inject(BranchesService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return fetched branches observable', () => {
    service.onGetBranches('test');
    expect(http.get).toHaveBeenCalledWith(
      'https://api.github.com/users/test/repos'
    );
  });
});
