import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private apiHost = 'assets/json/demo.json';
  private todoList: Todo[];

  constructor(private http: HttpClient) {
    this.initData();
  }

  initData() {
    this.http.get(this.apiHost).subscribe(
      (data) => {
        this.todoList = data['todo'];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    return this.todoList;
  }

  getData() {
    return this.initData();
  }
}
