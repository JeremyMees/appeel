import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BranchesService } from '../../services/branches.service';
import { routes } from '../../../app-routing.module';
import { BranchesComponent } from './branches.component';
import { Store, StoreModule } from '@ngrx/store';
import { MOCK_BRANCH } from '../../data/mock-branch.data';
import { of, throwError } from 'rxjs';
import { set } from 'src/app/store/branches/branches.actions';
import { branchesReducer } from 'src/app/store/branches/branches.reducers';
import { Branch } from '../../models/branch.model';
import { take } from 'rxjs/operators';

describe('BranchesComponent', () => {
  let component: BranchesComponent;
  let fixture: ComponentFixture<BranchesComponent>;
  let branchesService: jasmine.SpyObj<BranchesService>;
  let router: Router;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchesComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        StoreModule.forRoot({ branches: branchesReducer }),
      ],
      providers: [
        {
          provide: BranchesService,
          useValue: jasmine.createSpyObj('BranchesService', ['onGetBranches']),
        },
      ],
    }).compileComponents();
    branchesService = TestBed.inject(
      BranchesService
    ) as jasmine.SpyObj<BranchesService>;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesComponent);
    component = fixture.componentInstance;
    branchesService.onGetBranches.and.returnValue(of([MOCK_BRANCH]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onGetBranches', () => {
    it('should dispatch data when received', () => {
      spyOn(store, 'dispatch');
      component.onGetBranches();
      expect(component.loading).toBeFalsy();
      expect(store.dispatch).toHaveBeenCalledWith(
        set({ branches: [MOCK_BRANCH] })
      );
    });

    it('should alert when error is thrown', () => {
      spyOn(window, 'alert');
      branchesService.onGetBranches.and.returnValue(throwError('error'));
      component.onGetBranches();
      expect(component.loading).toBeFalsy();
      expect(window.alert).toHaveBeenCalledWith(
        "Couldn't fetch branches from Github"
      );
    });
  });

  describe('onSetSortBranches', () => {
    it('should sort branches by forks', () => {
      const changedBranch: Branch = { ...MOCK_BRANCH, forks_count: 5000 };
      component.branches$ = of([MOCK_BRANCH, changedBranch]);
      component.selectedBranch = 'Forks';
      component.onSetSortBranches();
      component.branches$
        .pipe(take(1))
        .subscribe((branches: Branch[]): void => {
          expect(branches).toEqual([changedBranch, MOCK_BRANCH]);
        });
    });

    it('should sort branches by stars', () => {
      const changedBranch: Branch = { ...MOCK_BRANCH, stargazers_count: 5000 };
      component.branches$ = of([MOCK_BRANCH, changedBranch]);
      component.selectedBranch = 'Stars';
      component.onSetSortBranches();
      component.branches$
        .pipe(take(1))
        .subscribe((branches: Branch[]): void => {
          expect(branches).toEqual([changedBranch, MOCK_BRANCH]);
        });
    });

    it('should sort branches by created_at', () => {
      const changedBranch: Branch = {
        ...MOCK_BRANCH,
        created_at: new Date().toISOString(),
      };
      component.branches$ = of([MOCK_BRANCH, changedBranch]);
      component.selectedBranch = 'Created';
      component.onSetSortBranches();
      component.branches$
        .pipe(take(1))
        .subscribe((branches: Branch[]): void => {
          expect(branches).toEqual([changedBranch, MOCK_BRANCH]);
        });
    });

    it('should sort branches by updated_at', () => {
      const changedBranch: Branch = {
        ...MOCK_BRANCH,
        updated_at: new Date().toISOString(),
      };
      component.branches$ = of([MOCK_BRANCH, changedBranch]);
      component.selectedBranch = 'Updated';
      component.onSetSortBranches();
      component.branches$
        .pipe(take(1))
        .subscribe((branches: Branch[]): void => {
          expect(branches).toEqual([changedBranch, MOCK_BRANCH]);
        });
    });

    it('should remove sort', () => {
      component.branches$ = of([MOCK_BRANCH]);
      spyOn(store, 'select').and.returnValue(of([MOCK_BRANCH, MOCK_BRANCH]));
      component.selectedBranch = undefined;
      component.onSetSortBranches();
      component.branches$
        .pipe(take(1))
        .subscribe((branches: Branch[]): void => {
          expect(branches).toEqual([MOCK_BRANCH, MOCK_BRANCH]);
        });
    });
  });

  it('should route to commits', () => {
    spyOn(router, 'navigateByUrl');
    component.onGoToCommits('branch');
    expect(router.navigateByUrl).toHaveBeenCalledWith('branches/branch');
  });

  it('should format date', () => {
    const date: string = component.onFormatDate(new Date(1647255078000));
    expect(date).toEqual('14/03/2022');
  });
});
