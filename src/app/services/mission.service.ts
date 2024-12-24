import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private apiUrl = 'http://localhost:8080/api/missions'; // Base URL of the backend API

  constructor(private http: HttpClient) {}

  /**
   * Get HTTP headers with JSESSIONID or other credentials
   */
  private getAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    // Add custom headers if needed, e.g., headers = headers.set('Authorization', 'Bearer token');
    return headers;
  }

  /**
   * Fetch all missions
   */
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/all`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Fetch a mission by ID
   * @param id - The unique identifier for the mission
   */
  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Create a new mission
   * @param mission - The mission object to be created
   */
  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(this.apiUrl, mission, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Update an existing mission by ID
   * @param id - The unique identifier of the mission to update
   * @param mission - The updated mission data
   */
  updateMission(id: number, mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${id}`, mission, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Delete a mission by ID
   * @param id - The unique identifier of the mission to delete
   */
  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Fetch missions for the current authenticated user
   */
  getMyMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/my`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Fetch missions by manager CIN
   * @param managerCin - The CIN of the manager
   */
  getMissionsByManager(managerCin: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/manager/${managerCin}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }
}
