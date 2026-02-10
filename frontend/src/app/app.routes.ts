import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { Project } from './services/project';

export const routes: Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'register',     component: SignupComponent},
    {path : 'portfolio/:id',component: Project},
    {path: 'new-project', component: Project},
];
