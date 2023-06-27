import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    class="todo-card-container"
    *ngFor="let todo of todos$ | async"
  >
    <div class="todo-content">
      <input
        class="text-teal-600 rounded focus:ring-teal-500"
        type="checkbox"
        name="done"
        [checked]="todo.done"
        (click)="updateTodo(todo)"
      />
      <div class="title-desc" [ngClass]="{ done: todo.done }">
        <h4 class="title">
          {{ todo.title }}
        </h4>
        <h5 class="description">
          {{ todo.description }}
        </h5>
      </div>
    </div>
    <button
      class="rounded p-2 bg-red-600 text-white text-center"
      (click)="deleteTodo(todo)"
    >
      Supprimer
    </button>
  </div>`,
  styles: [
    `
      .todo-card-container {
        width: clamp(80%, 5vw, 90%);
        max-width: 1200px;
        margin: 1rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
      }

      .todo-content {
        display: flex;
        align-items: center;
      }

      .title-desc {
        margin: 0.2rem;
        font-weight: normal;
      }

      .done {
        text-decoration: line-through;
      }

      input {
        margin-right: 2rem;
      }
    `,
  ],
})
export class TodoListComponent {
  private ts = inject(TodoService);
  readonly todos$ = this.ts.getTodos();

  updateTodo(todo: Todo) {
    todo.done = !todo.done;
    this.ts.updateTodo(todo);
  }
  deleteTodo(todo: Todo) {
    this.ts.deleteTodo(todo);
  }
}
