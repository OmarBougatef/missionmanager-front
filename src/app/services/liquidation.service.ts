import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Liquidation, LiquidationStatus } from '../models/liquidation';

@Injectable({
  providedIn: 'root',
})
export class LiquidationService {
  private apiUrl = 'http://localhost:8080/api/liquidations'; // Base URL of the backend API

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
   * Fetch all liquidations for the current authenticated user
   */
  getMyLiquidations(): Observable<Liquidation[]> {
    return this.http.get<Liquidation[]>(`${this.apiUrl}/my`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  getAllLiquidations(): Observable<Liquidation[]> {
    return this.http.get<Liquidation[]>(`${this.apiUrl}/all`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }


  /**
   * Fetch all liquidations for a specific user
   * @param userId - The unique identifier for the user
   */
  getLiquidationsForUser(userId: number): Observable<Liquidation[]> {
    return this.http.get<Liquidation[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Fetch all liquidations for a specific mission
   * @param missionId - The unique identifier for the mission
   */
  getLiquidationsForMission(missionId: number): Observable<Liquidation[]> {
    return this.http.get<Liquidation[]>(`${this.apiUrl}/mission/${missionId}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Fetch all liquidations for a manager by their CIN
   * @param managerId - The CIN of the manager
   */
  getLiquidationsForManager(managerId: number): Observable<Liquidation[]> {
    return this.http.get<Liquidation[]>(`${this.apiUrl}/manager/${managerId}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Create a new liquidation
   * @param request - The liquidation request data
   */
  createLiquidation(request: Liquidation): Observable<Liquidation> {
    return this.http.post<Liquidation>(`${this.apiUrl}/create`, request, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  updateLiquidation(id: number, liquidation: Liquidation): Observable<Liquidation> {
    return this.http.put<Liquidation>(`${this.apiUrl}/${id}`, liquidation, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  updateLiquidationStatusToValidated(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}/validate`;  // Endpoint for validation
    return this.http.put<void>(url, null, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }
  
  updateLiquidationStatusToRefused(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}/refuse`;  // Endpoint for refusal
    return this.http.put<void>(url, null, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }
}


