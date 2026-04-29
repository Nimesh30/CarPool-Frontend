import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Register } from './Pages/Auth/register/register';
import { Login } from './Pages/Auth/login/login';
import { SearchedJobs } from './Pages/searched-jobs/searched-jobs';
import { BookRide } from './Pages/book-ride/book-ride';

export const routes: Routes = [
  // ✅ MUST be exported
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'search', component: SearchedJobs },
  { path: 'book-ride', component: BookRide },
];
