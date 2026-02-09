import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class LoginComponent {
  private authService = inject(AuthService);
  //modéle pour le formulaire
  loginData = {
    email: '',
    password: '',
  };
  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response : any) => {
        // Stocker le token et les informations de l'utilisateur dans le localStorage
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        // Rediriger vers la page d'accueil ou une autre page après le login
        // this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  
  }
}
