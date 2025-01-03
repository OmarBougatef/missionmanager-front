import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Base URL of the backend API

  constructor(private http: HttpClient) {}

  /**
   * Get HTTP headers with JSESSIONID
   */
  private getAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers;
  }

  /**
   * Fetch all users
   */
  getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  /**
   * Fetch a user by CIN
   * @param cin - The unique identifier for the user
   */
  getUserByCin(cin: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/${cin}`, { headers,
      withCredentials: true, });
  }

  /**
   * Create a new user
   * @param user - The user object to be created
   */
  createUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(this.apiUrl, user, { headers, withCredentials: true, });
  }

  /**
   * Update an existing user by CIN
   * @param cin - The unique identifier of the user to update
   * @param userDetails - The updated user data
   */
  updateUser(cin: number, userDetails: User): Observable<User> {
    const headers = this.getAuthHeaders();
    console.log('headers', headers)
    return this.http.put<User>(`${this.apiUrl}/${cin}`, userDetails, { headers,
      withCredentials: true, });
  }

  /**
   * Delete a user by CIN
   * @param cin - The unique identifier of the user to delete
   */
  deleteUser(cin: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${cin}`, { headers,
      withCredentials: true, });
  }
}
