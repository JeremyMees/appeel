import { TestBed } from '@angular/core/testing';
import { CommitsService } from './commits.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CommitsService', () => {
  let service: CommitsService;
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
    service = TestBed.inject(CommitsService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return fetched commits observable', () => {
    service.onGetCommits('test');
    expect(http.get).toHaveBeenCalledWith(
      'https://api.github.com/repos/JeremyMees/test/commits?limit=20&page=1'
    );
  });
});
