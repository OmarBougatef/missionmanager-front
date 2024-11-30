// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Delete a user by CIN
  deleteUser(cin: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cin}`);
  }

  // Fetch a user by CIN
  getUserByCin(cin: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${cin}`);
  }
}
