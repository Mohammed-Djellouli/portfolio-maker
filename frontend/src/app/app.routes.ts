import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { NewProject } from './components/new-project/new-project';
import { ProjectList } from './components/project-list/project-list';

export const routes: Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'register',     component: SignupComponent},
    {path : 'portfolio/:id',component: ProjectList},
    {path: 'new-project', component: NewProject},
];
    