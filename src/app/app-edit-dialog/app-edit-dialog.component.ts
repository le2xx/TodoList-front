import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Todo} from '../common/interfaces/todo';
import {HttpErrorResponse} from '@angular/common/http';
import {TodoListService} from '../common/services/todo-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-app-edit-dialog',
  templateUrl: './app-edit-dialog.component.html',
  styleUrls: ['./app-edit-dialog.component.scss']
})
export class AppEditDialogComponent {
  text = '';
  progress = 0;

  editForm: FormGroup = new FormGroup({
    id: new FormControl(this.data.id),
    text: new FormControl('', [
      Validators.required,
      Validators.pattern('[^!]*')
    ]),
    date: new FormControl(this.todoListService.dateToday())
  });

  constructor(
    public todoListService: TodoListService,
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

  progressBar() {
    const progressUp = () => {
      if (this.progress >= 100) {
        this.dialogRef.close(this.text);
      }
      setTimeout(() => {
        this.progress += 1;
        progressUp();
      }, 10);
    };
    progressUp();
  }

  editTodo() {
    if (this.editForm.invalid) {
      this.progressBar();
      return;
    }
    this.todoListService.editData(this.editForm.value)
      .subscribe(() => {
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    this.progressBar();
  }
}
