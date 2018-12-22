import {Component, OnInit} from '@angular/core';
import {Todo} from './common/interfaces/todo';
import {TodoListService} from './common/services/todo-list.service';
import {MatDialog} from '@angular/material';
import {AppConfirmDialogComponent} from './app-confirm-dialog/app-confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todoList: Todo[];
  displayedColumns: string[] = ['id', 'text', 'date', 'buttons'];
  preloaderFlag = false;
  inputForm = '';

  constructor(public confirmDialog: MatDialog, public todoListService: TodoListService) {
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

  openDialog(id: number) {
    const confirmDialog = this.confirmDialog.open(AppConfirmDialogComponent, {
      width: '300px',
      height: '170px',
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.todoList = this.todoList.filter(item => item.id !== id);
      }
    });
  }
}
