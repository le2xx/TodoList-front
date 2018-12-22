import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Todo} from '../common/interfaces/todo';

@Component({
  selector: 'app-app-edit-dialog',
  templateUrl: './app-edit-dialog.component.html',
  styleUrls: ['./app-edit-dialog.component.scss']
})
export class AppEditDialogComponent {
  text = '';
  progress = 0;

  constructor(
    public dialogRef: MatDialogRef<AppEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo) {
    this.text = data.text;
  }

  onKey(event: any) {
    this.text = event.target.value;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    const progressUp = () => {
      if (this.progress >= 100) {
        // ToDo function delete items
        this.dialogRef.close(this.text);
      }
      setTimeout(() => {
        this.progress += 1;
        progressUp();
      }, 10);
    };
    progressUp();
  }
}
