import {Component, OnInit, ViewChild} from '@angular/core';
import {Todo} from './common/interfaces/todo';
import {TodoListService} from './common/services/todo-list.service';
import {MatDialog} from '@angular/material';
import {AppConfirmDialogComponent} from './app-confirm-dialog/app-confirm-dialog.component';
import {AppEditDialogComponent} from './app-edit-dialog/app-edit-dialog.component';
import {MatSidenav} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') public sideNav: MatSidenav;

  todoList: Todo[] = [];
  displayedColumns: string[] = ['id', 'text', 'date', 'buttons'];
  preloaderFlag = false;
  addFlag = false;
  inputForm = '';

  todoForm: FormGroup = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.pattern('[^!]*')
    ]),
    date: new FormControl(this.todoListService.dateToday())
  });

  constructor(
    public confirmDialog: MatDialog,
    public editDialog: MatDialog,
    public todoListService: TodoListService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.preloaderFlag = true;
      this.getTodo();
    }, 2000);

    this.autoUpdate();
  }

  autoUpdate() {
    setTimeout(() => {
      this.getTodo();
      this.autoUpdate();
    }, 60000);
  }

  getTodo() {
    this.todoListService.getData().subscribe((data) => {
      this.todoList = data['todo'];
    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    });
  }

  setTodo() {
    const controls = this.todoForm.controls;
    this.addFlag = !this.addFlag;

    setTimeout(() => {
      if (this.todoForm.invalid) {
        Object.keys(controls)
          .forEach(controlName => controls[controlName].markAsTouched());
        this.snackBar.open('Вы ввели текст со знаком !', 'Закрыть', {
          duration: 5000,
        });
        this.addFlag = !this.addFlag;
        return;
      }
      this.addFlag = !this.addFlag;
      this.sideNav.close();
      this.todoListService.setData(this.todoForm.value)
        .subscribe(() => {
          this.getTodo();
        }, (err: HttpErrorResponse) => {
          console.log(err.message);
        });
    }, 2000);
  }

  deleteTodo(id: number) {
    this.todoListService.deleteData(String(id))
      .subscribe(
        () => {
          this.todoList = this.todoList.filter(item => item.id !== id);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        });
  }

  onKey(event: any) {
    this.inputForm = event.target.value;
  }

  openConfirmDialog(id: number) {
    const confirmDialog = this.confirmDialog.open(AppConfirmDialogComponent, {
      width: '300px',
      height: '170px',
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTodo(id);
      }
    });
  }

  openEditDialog(id: number) {
    const [todo] = this.todoList.filter(item => item.id === id);
    const editDialog = this.editDialog.open(AppEditDialogComponent, {
      width: '250px',
      height: '270px',
      data: todo
    });
    editDialog.afterClosed().subscribe(result => {
      if (result) {
        this.getTodo();
      }
    });
  }
}
