import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Project } from '../../services/project';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { authState } from '../auth.state';
import { PortfolioModals } from './portfolio-modals';

@Component({
  selector: 'app-porfolio',
  imports: [
    CommonModule,
    PortfolioModals
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
  private cdr = inject(ChangeDetectorRef);
// variable pour stocker les informations de l'utilisateur
  user : any = null;
  //tableau pour stocker les projets
  projects : any[] = [];
  //variable pour vérifier si l'utilisateur connecté est le propriétaire du portfolio
  isOwner: boolean = false;
  //année courante pour le footer
  currentYear: number = new Date().getFullYear();

  // Gestion des modals
  activeModal: string | null = null;
  
  // Données temporaires pour les formulaires
  formData: any = {};


  // Ouvrir un modal
  openModal(modalName: string) {
    this.activeModal = modalName;
    this.formData = {}; // Réinitialiser les données du formulaire
    
    // Pré-remplir les données pour l'édition
    if (modalName === 'profile' && this.user) {
      this.formData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        title: this.user.title,
        bio: this.user.bio,
        profileImage: this.user.profileImage
      };
    } else if (modalName === 'social-links' && this.user) {
      this.formData = {
        github: this.user.github,
        linkedin: this.user.linkedin,
        twitter: this.user.twitter,
        email: this.user.email
      };
    }
  }

  // Fermer le modal
  closeModal() {
    this.activeModal = null;
    this.formData = {};
  }

  // Sauvegarder les modifications du profil
saveProfile() {
  const modifiedData = {
    firstName: this.formData.firstName,
    lastName: this.formData.lastName,
    title: this.formData.title,
    bio: this.formData.bio,
    profileImage: this.formData.profileImage
  };

  // On utilise l'ID venant de l'objet user (souvent _id avec MongoDB)
  const idToUpdate = this.user._id

  this.userService.saveProfile(idToUpdate, modifiedData).subscribe({
    next: (response) => {
      console.log('Profile updated successfully:', response);
      
      // Mise à jour locale pour l'affichage immédiat
      this.user = { ...this.user, ...modifiedData };
      
      // On ne ferme la modale QUE si le serveur a validé l'enregistrement
      this.closeModal(); 
    },
    error: (err) => {
      console.error('Error updating profile:', err);
    }
  });
}


  saveSocialLinks() {
    //TODO: Implémenter la sauvegarde des liens sociaux
    console.log('Saving social links:', this.formData);
    this.closeModal();
  }

  // Ajouter une compétence
  addSkill() {
    // TODO: Implémenter l'ajout de compétence
    console.log('Adding skill:', this.formData);
    this.closeModal();
  }

  // Ajouter une méthodologie
  addMethodology() {
    // TODO: Implémenter l'ajout de méthodologie
    console.log('Adding methodology:', this.formData);
    this.closeModal();
  }

  // Ajouter une expérience
  addExperience() {
    // TODO: Implémenter l'ajout d'expérience
    console.log('Adding experience:', this.formData);
    this.closeModal();
  }

  // Ajouter une éducation
  addEducation() {
    // TODO: Implémenter l'ajout d'éducation
    console.log('Adding education:', this.formData);
    this.closeModal();
  }

  // Ajouter un projet
  addProject() {
    // Convertir les technologies en tableau si elles sont séparées par des virgules
    if (this.formData.technologies && typeof this.formData.technologies === 'string') {
      this.formData.technologies = this.formData.technologies.split(',').map((t: string) => t.trim());
    }
    // TODO: Implémenter l'ajout de projet
    console.log('Adding project:', this.formData);
    this.closeModal();
  }




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
        // Forcer la détection de changement pour mettre à jour la vue
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur profil', err)
    });

    this.projectService.getProjects(userIdUrl).subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projects:', this.projects);
        // Forcer la détection de changement pour mettre à jour la vue
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur projets', err)
    });
  }
}
