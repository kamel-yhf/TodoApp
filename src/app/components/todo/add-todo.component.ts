import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="rounded-lg p-8 lg:col-span-3 lg:p-12">
        <form action="" class="grid grid-cols-3 gap-4" [formGroup]="addTodoForm">
          <div>
            <label class="sr-only" for="name">Titre</label>
            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Titre"
              type="text"
              id="name"
              formControlName="title"
            />
          </div>

          <div>
            <label class="sr-only" for="message">Description</label>

            <input
              class="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Description"
              type="text"
              id="message"
              formControlName="description"
            />
          </div>

          <div>
            <button
              type="submit"
              [class.opacity-50]="addTodoForm.invalid"
              [class.cursor-not-allowed]="addTodoForm.invalid"
              class="flex w-full justify-center rounded-md bg-teal-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm"
              (click)="onSubmit()"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class AddTodoComponent {
  private ts = inject(TodoService);
  addTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onSubmit() {
    const todo: Todo = {
      title: this.addTodoForm.value.title!,
      description: this.addTodoForm.value.description!,
      done: false,
    };
    console.log(todo);
    

    this.ts.newTodo(todo);
    this.addTodoForm.reset();
  }
}
