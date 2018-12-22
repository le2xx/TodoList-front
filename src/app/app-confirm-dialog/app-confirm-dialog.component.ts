import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-app-confirm-dialog',
  templateUrl: './app-confirm-dialog.component.html',
  styleUrls: ['./app-confirm-dialog.component.scss'],
})
export class AppConfirmDialogComponent {
  progress = 0;

  constructor(
    public dialogRef: MatDialogRef<AppConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    const progressUp = () => {
      if (this.progress >= 100) {
        // ToDo function delete items
        this.dialogRef.close(true);
      }
      setTimeout(() => {
        this.progress += 1;
        progressUp();
      }, 10);
    };
    progressUp();
  }
}
