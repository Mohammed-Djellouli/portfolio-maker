import { Component, inject } from '@angular/core';
import { Project } from '../../services/project';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { authState } from '../auth.state';

@Component({
  selector: 'app-porfolio',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './porfolio.html',
  styleUrl: './porfolio.css',
  standalone: true
})
export class Porfolio {
  private projectService = inject(Project);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
// variable pour stocker les informations de l'utilisateur
  user : any = null;
  //tableau pour stocker les projets
  projects : any[] = [];
  //variable pour vérifier si l'utilisateur connecté est le propriétaire du portfolio
  isOwner: boolean = false;
  //année courante pour le footer
  currentYear: number = new Date().getFullYear();




ngOnInit() {
    let userIdUrl = this.route.snapshot.paramMap.get('id');
    
    // Si aucun ID n'est fourni dans l'URL, utiliser l'ID de l'utilisateur connecté
    if (!userIdUrl) {
      const loggedId = localStorage.getItem('userId');
      if (loggedId) {
        // Rediriger vers le portfolio de l'utilisateur connecté
        this.router.navigate(['/portfolio', loggedId]);
        return;
      } else {
        // Si aucun utilisateur n'est connecté, rediriger vers la page de connexion
        this.router.navigate(['/login']);
        return;
      }
    }

    // Vérifier si l'utilisateur connecté est le propriétaire du portfolio
    const loggedId = localStorage.getItem('userId');
    this.isOwner = authState() && loggedId === userIdUrl;

    // Récupérer les informations de l'utilisateur et ses projets
    this.userService.getUserInfos(userIdUrl).subscribe({
      next: (data: any) => {
        // Combiner firstName et lastName pour créer le nom complet
        this.user = {
          ...data,
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim()
        };
        console.log('User data:', this.user);
      },
      error: (err) => console.error('Erreur profil', err)
    });

    this.projectService.getProjects(userIdUrl).subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projects:', this.projects);
      },
      error: (err) => console.error('Erreur projets', err)
    });
  }
}
