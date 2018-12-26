import {Component, OnInit, ViewChild} from '@angular/core';
import {Todo} from './common/interfaces/todo';
import {TodoListService} from './common/services/todo-list.service';
import {MatDialog} from '@angular/material';
import {AppConfirmDialogComponent} from './app-confirm-dialog/app-confirm-dialog.component';
import {AppEditDialogComponent} from './app-edit-dialog/app-edit-dialog.component';
import {MatSidenav} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') public sideNav: MatSidenav;

  todoList: Todo[];
  displayedColumns: string[] = ['id', 'text', 'date', 'buttons'];
  preloaderFlag = false;
  addFlag = false;
  inputForm = '';

  todoForm: FormGroup = new FormGroup({
    text: new FormControl('',[
      Validators.required,
      Validators.pattern('[^!]*')
    ]),
    date: new FormControl(this.dateToday())
  });

  constructor(
    public confirmDialog: MatDialog,
    public editDialog: MatDialog,
    public todoListService: TodoListService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.preloaderFlag = true;
      this.todoList = this.todoListService.getData();
    }, 2000);
  }

  onKey(event: any) {
    this.inputForm = event.target.value;
  }

  dateToday() {
    const date = new Date;
    return date.getDate() + '-' + Number(date.getMonth() + 1) + '-' + date.getFullYear();
  }

  onAddTodo() {
    const date = new Date;
    const item = {
      id: 6,
      text: this.inputForm,
      date: date.getDate() + '/' + Number(date.getMonth() + 1) + '/' + date.getFullYear()
    };
    const newData = this.todoList.slice();
    setTimeout(() => {
      this.addFlag = !this.addFlag;
      newData.push(item);
      this.todoList = newData;
      this.sideNav.close();
    }, 2000);
    this.addFlag = !this.addFlag;
  }

  openConfirmDialog(id: string) {
    const confirmDialog = this.confirmDialog.open(AppConfirmDialogComponent, {
      width: '300px',
      height: '170px',
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.todoListService.deleteData(id);
        this.todoList = this.todoList.filter(item => item.id !== Number(id));
      }
    });
  }

  openEditDialog(id: number) {
    const [todo] = this.todoList.filter(item => item.id === id);
    const editDialog = this.editDialog.open(AppEditDialogComponent, {
      width: '250px',
      height: '250px',
      data: todo
    });
    editDialog.afterClosed().subscribe(result => {
      if (result) {
        this.todoList.map(item => item.id === id ? item.text = result : null);
      }
    });
  }

  submit() {
    const controls = this.todoForm.controls;

    if (this.todoForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.todoListService.setData(this.todoForm.value);
    console.log(this.todoForm.value);
  }
}
