import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * Perform login and store user data in localStorage
   */
  login(cin: number, email: string): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/login`,
      { cin, email },
      {
        withCredentials: true,
        observe: 'response',
      }
    ).pipe(
      tap((response) => {
        const jsessionid = this.extractJSessionId(response.headers.get('set-cookie') || '');
        // Store the user data locally
        if (response.body && jsessionid) {
          localStorage.setItem('JSESSIONID', jsessionid);
          localStorage.setItem('userData', JSON.stringify(response.body));
        }

        // Log success for debugging
        console.log('Login successful. User data stored in localStorage.');
      }),
      map((response) => response.body as User) // Map response.body to return Observable<User>
    );
  }

  private extractJSessionId(setCookieHeader: string): string | null {
    const match = setCookieHeader.match(/JSESSIONID=([^;]+);/);
    return match ? match[1] : null;
  }

  /**
   * Get the logged-in user from localStorage
   */
  getUser(): User | null {
    if (!this.user) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
    return this.user;
  }

  /**
   * Clear user data from localStorage and in-memory cache
   */
  clearUser(): void {
    this.user = null;
    localStorage.removeItem('userData');
  }
}
