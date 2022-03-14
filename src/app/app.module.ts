import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BranchesModule } from './branches/branches.module';
import { CommitsModule } from './commits/commits.module';
import { StylingModule } from './styling/styling.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { branchesReducer } from './store/branches/branches.reducers';
import { commitsReducer } from './store/commits/commits.reducer';
@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StylingModule,
    BranchesModule,
    CommitsModule,
    StoreModule.forRoot({ branches: branchesReducer, commits: commitsReducer }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
