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
