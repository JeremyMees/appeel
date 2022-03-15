import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../services/branches.service';
import { take } from 'rxjs/operators';
import { Branch } from '../../models/branch.model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { set } from 'src/app/store/branches/branches.actions';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  branches$!: Observable<Branch[]>;
  loading: boolean = true;
  sortOptions: string[] = ['Stars', 'Forks', 'Created', 'Updated'];
  selectedBranch: string | undefined;

  constructor(
    private branchesService: BranchesService,
    private router: Router,
    private store: Store<{ branches: Branch[] }>
  ) {}

  public ngOnInit(): void {
    this.onGetBranches();
    this.branches$ = this.store.select('branches');
  }

  public onGetBranches(): void {
    this.branchesService
      .onGetBranches('JeremyMees')
      .pipe(take(1))
      .subscribe({
        next: (res: Branch[]) => {
          this.store.dispatch(set({ branches: res }));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert("Couldn't fetch branches from Github");
        },
      });
  }

  public onGoToCommits(branch: string): void {
    this.router.navigateByUrl(`branches/${branch}`);
  }

  public onSetSortBranches(): void {
    switch (this.selectedBranch) {
      case 'Forks':
        this._onSortBranches('forks_count');
        break;
      case 'Stars':
        this._onSortBranches('stargazers_count');
        break;
      case 'Created':
        this._onSortBranches('created_at');
        break;
      case 'Updated':
        this._onSortBranches('updated_at');
        break;
      default:
        this.selectedBranch = undefined;
        this.branches$ = this.store.select('branches');
        break;
    }
  }

  /**
   * Sort array of branches by key value
   * @param {string} sort key to sort by.
   */
  private _onSortBranches(sort: string): void {
    this.branches$.pipe(take(1)).subscribe((branches: Branch[]) => {
      const sortBranches = [...branches];
      this.branches$ = of(
        sortBranches.sort(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (a: { [key: string]: any }, b: { [key: string]: any }) => {
            return sort === 'created_at' || sort === 'updated_at'
              ? Date.parse(b[sort]) - Date.parse(a[sort])
              : Number(b[sort]) - Number(a[sort]);
          }
        )
      );
    });
  }

  /**
   * Turns date to formated date (dd/mm/yyyy)
   * @param {string|Date} time unformated date.
   * @return {string} formated date.
   */
  public onFormatDate(time: Date | string): string {
    const date: Date = new Date(time);
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: number = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
