import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  // private apiHost = 'assets/json/demo.json';
  private apiHost = 'http://localhost/index.php';
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

  setData(setDate) {
    this.http.post(this.apiHost, setDate).subscribe((data) => {
      console.log(data);
    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    });
  }

  updateData(id: string) {
    this.http.put(this.apiHost, id).subscribe(
      (data) => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  deleteData(id: string) {
    this.http.delete(this.apiHost + '?id=' + id).subscribe(
      (data) => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }
}
