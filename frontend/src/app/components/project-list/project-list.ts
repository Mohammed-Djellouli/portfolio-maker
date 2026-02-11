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
public isOwner: boolean = false;

//tableau pour stocker les projets
projects: any[] = [];
//fonction pour récupérer les projets de l'utilisateur
ngOnInit() {

  const userIdUrl = this.router.snapshot.paramMap.get('id');
    const userIdLocal = localStorage.getItem('userId');
    
    // 2. Assigner à la propriété de la classe (utiliser 'this.')
    this.isOwner = userIdUrl === userIdLocal;
    
    console.log('URL ID:', userIdUrl); // Debug
    console.log('Local ID:', userIdLocal); // Debug
    console.log('Is Owner:', this.isOwner);
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

  onDelete(projectId: string) {
  
    const urlId = this.router.snapshot.paramMap.get('id');
    const loggedUser = localStorage.getItem('userId');

    // Vérifier si l'utilisateur connecté est le propriétaire du projet
    this.isOwner = !!loggedUser && urlId === loggedUser;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          this.projects = this.projects.filter(project => project._id !== projectId);
        },
        error: (error) => {
          console.error('Error deleting project', error);
        }
      });
    }
  }
}
