import { Injectable,inject } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.backendUrl;


  getUserInfos(userId: string) {
    return this.http.get(`${this.baseUrl}/portfolio/${userId}`);
  }

saveProfile(userId: string, profileData: any) {
  return this.http.put(`${this.baseUrl}/update/${userId}`, profileData);
}

}
