import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesComponent } from './components/branches/branches.component';
import { StylingModule } from '../styling/styling.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BranchesComponent],
  imports: [CommonModule, StylingModule, FormsModule],
})
export class BranchesModule {}
