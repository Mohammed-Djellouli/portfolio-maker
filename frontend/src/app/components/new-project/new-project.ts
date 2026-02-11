import { Component, inject, OnInit } from '@angular/core'; // Ajout de OnInit
import { Project } from '../../services/project';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-project.html',
  styleUrl: './new-project.css',
})
export class NewProject implements OnInit {
//
  private projectService = inject(Project);
  private router = inject(Router);

  public userId: string | null = null;
  
  public projectData = {
    title: '',
    description: '',
    technologies: '', 
    links:{
        github: '',
        liveDemo: ''
    },
    imageUrl: '',
  };


  ngOnInit() {
    this.userId = localStorage.getItem('userId');

    if (!this.userId) {
      console.error('Utilisateur non connecté');
      alert('Veuillez vous connecter pour créer un projet.');
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (!this.userId) return;

    const finalData = {
      ...this.projectData,
      userId: this.userId, 
      links:{
        github: 'http://' + this.projectData.links.github,
        liveDemo: 'http://' + this.projectData.links.liveDemo
      },
      // Convertir la chaîne de technologies en tableau
      technologies: this.projectData.technologies.split(',').map(t => t.trim())
    };

    this.projectService.createProject(finalData).subscribe({
      next: (response) => {
        console.log('Projet créé !', response);
        // On redirige vers le portfolio de l'utilisateur
        this.router.navigate(['/portfolio', this.userId]);
      },
      error: (error) => {
        console.error('Erreur lors de la création', error);
        alert('Erreur lors de la création du projet.');
      }
    });
  }
}