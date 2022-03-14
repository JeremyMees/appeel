import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/components/branches/branches.component';
import { CommitsComponent } from './commits/components/commits/commits.component';

export const routes: Routes = [
  { path: '', redirectTo: 'branches', pathMatch: 'full' },
  { path: 'branches', component: BranchesComponent },
  { path: 'branches/:branch', component: CommitsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
