import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { redirectIfLogged } from './guards/redirectIfLogged.guard';
import { ProductComponent } from './pages/producto/producto.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [redirectIfLogged] },
  { path: 'register', component: RegisterComponent, canActivate: [redirectIfLogged] }, // Comma added here
  { path: 'products/:id', component: ProductComponent, pathMatch: 'full' },
];

export const appConfig = [
  provideRouter(routes)
];
