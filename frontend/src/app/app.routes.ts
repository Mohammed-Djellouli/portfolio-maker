import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { NewProject } from './components/new-project/new-project';
import { ProjectList } from './components/project-list/project-list';
import { Porfolio } from './components/porfolio/porfolio';

export const routes: Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'register',     component: SignupComponent},
    {path : 'projects/:id',component: ProjectList},
    {path: 'new-project', component: NewProject},
    {path:'portfolio/:id', component: Porfolio},
    {path:'portfolio', component: Porfolio}, // Redirection auto vers le portfolio de l'utilisateur connecté
];
    