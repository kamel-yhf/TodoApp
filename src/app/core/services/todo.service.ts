import { Injectable, inject } from '@angular/core';
import { AngularTodoDB } from './db';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Todo } from '../models/todo.model';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  db = new AngularTodoDB();
  private router = inject(Router);

  getUsers() {
    return this.db.users.toArray();
  }
  logIn(email: string) {
    return this.db.users.get(email);
  }
  newUser(user: User) {
    return this.db.users.add(user);
  }
  isLogedIn() {
    if (localStorage.getItem('email')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // CRUD todos
  newTodo(todo: Todo) {
    return this.db.todos.add(todo);
  }
  getTodos() {
    return liveQuery(() => this.db.todos.toArray());
  }
  updateTodo(todo: Todo) {
    return this.db.todos.update(todo.id!, todo);
  }
  deleteTodo(todo: Todo) {
    return this.db.todos.delete(todo.id!);
  }
}
