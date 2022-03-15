import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../services/branches.service';
import { take } from 'rxjs/operators';
import { Branch } from '../../models/branch.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
