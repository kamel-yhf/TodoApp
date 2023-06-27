import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../shared/toolbar.component';
import { AddTodoComponent } from './add-todo.component';
import { TodoListComponent } from './todo-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    AddTodoComponent,
    TodoListComponent,
  ],
  template: `
    <app-toolbar [isLogoutBtnShow]="true" />
    <app-add-todo />
    <app-todo-list />
  `,
  styles: [],
})
export default class TodoComponent {}
