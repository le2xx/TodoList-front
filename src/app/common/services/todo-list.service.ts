import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient) {
  }
  private apiHost = 'http://172.20.102.35/index.php';

  dateToday() {
    const date = new Date;
    return date.getDate() + '-' + Number(date.getMonth() + 1) + '-' + date.getFullYear();
  }

  getData() {
    return this.http.get(this.apiHost);
  }

  setData(todo: Todo) {
    return this.http.post(this.apiHost, todo);
  }

  editData(todo: Todo) {
    return this.http.put(this.apiHost, todo);
  }

  deleteData(id: string) {
    return this.http.delete(this.apiHost + '?id=' + id);
  }
}
