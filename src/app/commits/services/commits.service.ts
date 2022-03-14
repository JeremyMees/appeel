import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commit } from '../models/commit.model';

@Injectable({
  providedIn: 'root',
})
export class CommitsService {
  constructor(private http: HttpClient) {}

  public onGetCommits(branch: string): Observable<Commit[]> {
    return this.http.get<Commit[]>(
      `https://api.github.com/repos/JeremyMees/${branch}/commits?limit=20&page=1`
    );
  }
}
