import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { TodoService } from './core/services/todo.service';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login | ToodoApp',
    loadComponent: () => import('./components/auth/login.component'),
  },
  {
    path: 'register',
    title: 'Register | ToodoApp',
    loadComponent: () => import('./components/auth/register.component'),
  },
  {
    path: 'todos',
    title: 'Todos | ToodoApp',
    loadComponent: () => import('./components/todo/todo.component'),
    canActivate: [() => inject(TodoService).isLogedIn()],
  },
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
];
