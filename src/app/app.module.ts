import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatProgressBarModule
} from '@angular/material';


import {AppComponent} from './app.component';
import {AppConfirmDialogComponent} from './app-confirm-dialog/app-confirm-dialog.component';
import {TodoListService} from './common/services/todo-list.service';
import { AppEditDialogComponent } from './app-edit-dialog/app-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AppConfirmDialogComponent,
    AppEditDialogComponent
  ],
  entryComponents: [
    AppComponent,
    AppConfirmDialogComponent,
    AppEditDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
