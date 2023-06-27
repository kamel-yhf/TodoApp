import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../shared/toolbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ReactiveFormsModule, RouterModule],
  template: ` <app-toolbar [isLoginBtnShow]="true" />
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg">
        <form
          [formGroup]="registerForm"
          action=""
          class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <h1 class="text-center text-2xl font-bold text-teal-600 sm:text-3xl">
            Enregistrez-vous
          </h1>
          <p class="text-center text-lg font-medium">
            Veuillez entrer votre email et votre mot de passe
          </p>

          <div>
            <label for="email" class="sr-only">Email</label>

            <div class="relative">
              <input
                type="email"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                formControlName="email"
              />

              <span
                class="absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>

            <div class="relative">
              <input
                type="password"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                formControlName="password"
              />

              <span
                class="absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            [class.opacity-50]="registerForm.invalid"
            [class.cursor-not-allowed]="registerForm.invalid"
            class="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
            (click)="onSubmit()"
          >
            S'inscrire
          </button>

          <p class="text-center text-sm text-gray-500">
            Déja un compte ?
            <a class="underline" routerLink="/login">Se connecter</a>
          </p>
        </form>
      </div>
    </div>`,
  styles: [],
})
export default class RegisterComponent {
  private ts = inject(TodoService);
  private router = inject(Router);
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      };

      await this.ts.newUser(user);
      localStorage.setItem('email', user.email);
      this.router.navigateByUrl('/todos');
    }
  }
}
