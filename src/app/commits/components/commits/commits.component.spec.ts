import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { routes } from 'src/app/app-routing.module';
import { set } from 'src/app/store/commits/commits.actions';
import { commitsReducer } from 'src/app/store/commits/commits.reducer';
import { MOCK_COMMIT } from '../../data/mock-commit.data';
import { Commit } from '../../models/commit.model';
import { CommitsService } from '../../services/commits.service';
import { CommitsComponent } from './commits.component';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;
  let commitsService: jasmine.SpyObj<CommitsService>;
  let router: Router;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitsComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        StoreModule.forRoot({ commits: commitsReducer }),
      ],
      providers: [
        {
          provide: CommitsService,
          useValue: jasmine.createSpyObj('CommitsService', ['onGetCommits']),
        },
      ],
    }).compileComponents();
    commitsService = TestBed.inject(
      CommitsService
    ) as jasmine.SpyObj<CommitsService>;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsComponent);
    component = fixture.componentInstance;
    commitsService.onGetCommits.and.returnValue(of([MOCK_COMMIT]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onGetCommits', () => {
    it('should dispatch data when received', () => {
      spyOn(store, 'dispatch');
      component.onGetCommits('test');
      expect(component.loading).toBeFalsy();
      expect(store.dispatch).toHaveBeenCalledWith(
        set({ commits: [MOCK_COMMIT] })
      );
    });

    it('should alert when error is thrown', () => {
      spyOn(window, 'alert');
      commitsService.onGetCommits.and.returnValue(throwError('error'));
      component.onGetCommits('test');
      expect(component.loading).toBeFalsy();
      expect(window.alert).toHaveBeenCalledWith(
        "Couldn't fetch commits from Github"
      );
    });
  });

  describe('onFilterCommits', () => {
    it('should filter all commit and find value', () => {
      component.onFilterCommits('string');
      component.commits$.pipe(take(1)).subscribe((commits: Commit[]) => {
        expect(commits).toEqual([MOCK_COMMIT]);
      });
    });

    it('should filter all commit and find no value', () => {
      component.onFilterCommits('test');
      component.commits$.pipe(take(1)).subscribe((commits: Commit[]) => {
        expect(commits).toEqual([]);
      });
    });

    it('should show all commits', () => {
      component.onFilterCommits('');
      component.commits$.pipe(take(1)).subscribe((commits: Commit[]) => {
        expect(commits).toEqual([MOCK_COMMIT]);
      });
    });
  });

  it('should remove filter', () => {
    component.filter.nativeElement.value = 'test';
    component.onRemoveFilter();
    expect(component.filter.nativeElement.value).toEqual('');
  });

  it('should remove filter', () => {
    spyOn(router, 'navigateByUrl');
    component.onGoBackToBranches();
    expect(router.navigateByUrl).toHaveBeenCalledWith('branches');
  });

  it('should format date', () => {
    const date: string = component.onFormatDate(new Date(1647255078000));
    expect(date).toEqual('14/03/2022 11:51');
  });
});
