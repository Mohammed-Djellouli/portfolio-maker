import { Injectable,inject } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.backendUrl;


  getUserInfos(userId: string) {
    return this.http.get(`${this.baseUrl}/infos/${userId}`);
  }

}
