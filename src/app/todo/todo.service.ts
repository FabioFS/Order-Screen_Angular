import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


const API = '/api/todos';

const TODOS = [
  { title: 'Install Angular CLI', isDone: true },
  { title: 'Style app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  get(params = {}) {
    return this.http.get(API, { params });
  }

// get() {
// return new Promise(resolve => resolve(TODOS));
// }

  add(data) {
    return new Promise(resolve => {
      TODOS.push(data);
      resolve(data);
    });
  }
}