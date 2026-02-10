import { Component, inject } from '@angular/core';
import { Project } from '../../services/project';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-list',
  imports: [CommonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  //injecter le service pour les projets
private projectService = inject(Project);
private router = inject(ActivatedRoute);

//tableau pour stocker les projets
projects: any[] = [];
//fonction pour récupérer les projets de l'utilisateur
ngOnInit() {
  //récupérer l'id de l'utilisateur à partir de la route
  const userId = this.router.snapshot.paramMap.get('id');
  if (userId) {
    //récupérer les projets de l'utilisateur à partir du service
    this.projectService.getProjects(userId).subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error fetching projects', error);
      }
    });
  } else {
    console.error('User ID not found in route parameters');
  }
}

}
