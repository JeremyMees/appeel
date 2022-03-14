import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesComponent } from './components/branches/branches.component';
import { StylingModule } from '../styling/styling.module';

@NgModule({
  declarations: [BranchesComponent],
  imports: [CommonModule, StylingModule],
})
export class BranchesModule {}
