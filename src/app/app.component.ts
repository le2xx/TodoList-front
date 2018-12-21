import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Todo} from './common/interfaces/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  apiHost = 'assets/json/demo.json';
  todoList: Todo[];
  displayedColumns: string[] = ['id', 'text', 'date', 'buttons'];
  preloaderFlag = false;
  inputForm = '';


  constructor(private http: HttpClient) {
    this.http.get(this.apiHost).subscribe(
      (data) => {
        this.todoList = data['todo'];
        setTimeout(() => this.preloaderFlag = true, 2000);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  onKey(event: any) {
    this.inputForm = event.target.value;
  }
}
