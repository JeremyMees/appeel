import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { set } from 'src/app/store/commits/commits.actions';
import { Commit } from '../../models/commit.model';
import { CommitsService } from '../../services/commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
})
export class CommitsComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef<HTMLInputElement>;
  commits$!: Observable<Commit[]>;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private commitsService: CommitsService,
    private store: Store<{ commits: Commit[] }>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      this.onGetCommits(params.branch);
    });
    this.commits$ = this.store.select('commits');
  }

  public onGetCommits(branch: string): void {
    this.commitsService
      .onGetCommits(branch)
      .pipe(take(1))
      .subscribe({
        next: (res: Commit[]) => {
          this.store.dispatch(set({ commits: res.slice(0, 20) }));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert("Couldn't fetch commits from Github");
        },
      });
  }

  /**
   * Filter commits with commit messages that contains filter text
   * @param {string} text filter text.
   */
  public onFilterCommits(text: string): void {
    if (text !== '') {
      this.store
        .select('commits')
        .pipe(take(1))
        .subscribe((commits: Commit[]) => {
          this.commits$ = of(
            commits.filter((commit: Commit) =>
              commit.commit.message.includes(text)
            )
          );
        });
    } else {
      this.commits$ = this.store.select('commits');
    }
  }

  public onRemoveFilter(): void {
    this.filter.nativeElement.value = '';
    this.commits$ = this.store.select('commits');
  }

  public onGoBackToBranches(): void {
    this.router.navigateByUrl('branches');
  }

  /**
   * Turns date to formated date (dd/mm/yyyy hh:mm)
   * @param {string|Date} time unformated date.
   * @return {string} formated date.
   */
  public onFormatDate(time: Date | string): string {
    const date: Date = new Date(time);
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: number = date.getFullYear();
    const hour: string = String(date.getHours()).padStart(2, '0');
    const minute: string = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
}
