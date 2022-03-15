import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  imports: [CommonModule],
  exports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    DropdownModule,
  ],
})
export class StylingModule {}
