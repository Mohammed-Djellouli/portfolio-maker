import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  signupData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  };
  onSubmit() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Exclure confirmPassword avant d'envoyer les données au backend
    const { confirmPassword, ...dataToSend } = this.signupData;
    this.authService.register(dataToSend).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed', error);
        alert('Signup failed. Please check your details and try again.');
      }
    });
  }
}
