import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',

})
export class AuthService {
  private http  = inject(HttpClient);
  private baseUrl = `${environment.backendUrl}`;

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  }
