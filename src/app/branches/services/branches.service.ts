import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private http: HttpClient) {}

  public onGetBranches(user: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(
      `https://api.github.com/users/${user}/repos`
    );
  }
}
