import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitsComponent } from './components/commits/commits.component';
import { StylingModule } from '../styling/styling.module';

@NgModule({
  declarations: [CommitsComponent],
  imports: [CommonModule, StylingModule],
})
export class CommitsModule {}
