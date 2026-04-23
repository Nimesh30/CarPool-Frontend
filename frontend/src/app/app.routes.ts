import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './Auth/register/register';
import { Login } from './Auth/login/login';

export const routes: Routes = [   // ✅ MUST be exported
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login }
];