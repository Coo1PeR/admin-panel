import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'home',
    component: StartPageComponent,
    title: 'Home Page',
  },
];
