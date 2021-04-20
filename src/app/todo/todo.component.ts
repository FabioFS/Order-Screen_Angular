import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {


  private todos;
  private activeTasks;

  todoList:  TodoModel[] = []; // lista de pedidos vazia ( tipo: todo.models.ts )
  formGroup: FormGroup;
  taskGroup: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) { 
    
    this.formGroup = this.fb.group({
      task: ['', Validators.compose([
        Validators.minLength(3), // qtd minima de caracteres
        Validators.maxLength(30), // qtd maxima de caracteres
        Validators.required, // é obrigatiorio
      ])]
    });
  }

  // getTodos(){
  //   return this.todoService.get().then(todos => {
  //     this.todos = todos;
  //     this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
  //   });
  // }
  
  getTodos(query = '') {
    return this.todoService.get(query).subscribe(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
    });
  }

  ngOnInit() {
    this.loadFromLocalStorage();
    this.getTodos();
  }

    taskAdd() {
      const task = this.formGroup.controls.task.value;
      this.todoList.push(new TodoModel(task, false));
      this.saveOnLocalStorage();
      this.formGroup.reset();
    }

    private newTodo;

    addTodo(){
      this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
        return this.getTodos();
      }).then(() => {
        this.newTodo = ''; // clear input form value
      });
    }
  
    taskRemove(todo: TodoModel) {
      const index = this.todoList.indexOf(todo);
      if (index !== -1) {
        this.todoList.splice(index, 1);
      }
      this.saveOnLocalStorage();
    }
  
    taskDone(todo: TodoModel) {
      const index = this.todoList.indexOf(todo);
      if (index !== -1) {
        todo.done = true;
      }
      this.saveOnLocalStorage();
    }
  
    saveOnLocalStorage() {
      const data = JSON.stringify(this.todoList);
      localStorage.setItem('todos', data);
    }
  
    loadFromLocalStorage() {
      const data = localStorage.getItem('todos');
      if (data != null) {
        this.todoList = JSON.parse(data);
      }
      
    }
}
