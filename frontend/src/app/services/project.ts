import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Project {
  private http  = inject(HttpClient);
  private baseUrl = `${environment.backendUrl}/projects`;

//service pour les projets

  getProjects(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`);
  }

//fonction pour créer un projet
createProject(projectData: any): Observable<any> {
    
    return this.http.post(this.baseUrl, projectData);
  }


  deleteProject(projectId: string): Observable<any> {
    
  return this.http.delete(`${this.baseUrl}/${projectId}`);
  }
  
}
