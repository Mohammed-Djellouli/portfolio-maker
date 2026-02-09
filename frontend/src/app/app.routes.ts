import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';

export const routes: Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'register',     component: SignupComponent},
    {path : '', redirectTo: 'login', pathMatch: 'full'},
    {path : '**', redirectTo: 'login', pathMatch: 'full'},
];
