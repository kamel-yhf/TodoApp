import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="md:flex md:items-center md:gap-12">
            <a
              class="text-2xl font-bold text-teal-600 sm:text-3xl"
              routerLink="/todos"
            >
              TodoApp
            </a>
          </div>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <a
                class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                routerLink="/login"
                *ngIf="isLoginBtnShow"
              >
                Se connecter
              </a>
              <a
                class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                routerLink="/register"
                *ngIf="isRegisterBtnShow"
              >
                S'inscrire
              </a>
              <div class="flex items-center gap-2" *ngIf="isLogoutBtnShow">
                <a class="block shrink-0">
                  <p
                    class="h-10 w-10 rounded-full bg-gray-100 p-2 text-center font-bold text-teal-600 uppercase"
                  >
                    {{ firstEmailLetter![0] }}
                  </p>
                </a>
                <a
                  class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow "
                  routerLink="/login"
                  (click)="loutOut()"
                >
                  Se déconnecter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class ToolbarComponent {
  @Input() isLoginBtnShow!: boolean;
  @Input() isRegisterBtnShow!: boolean;
  @Input() isLogoutBtnShow!: boolean;

  readonly users = inject(TodoService).getUsers();
  firstEmailLetter = localStorage.getItem('email');

  loutOut() {
    localStorage.clear();
  }
}
