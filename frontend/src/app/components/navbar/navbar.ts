import { Component, signal } from '@angular/core';
import { authState } from '../auth.state';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Utiliser un signal pour suivre l'état de connexion
  readonly isLoggedIn = authState;

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    authState.set(false);
  }
}
