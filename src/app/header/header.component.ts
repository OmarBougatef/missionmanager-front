import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
  ]
})
export class HeaderComponent implements OnInit {
  userData: User | null = null;
  profilePicture: string = 'profile.png';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Retrieve user data from AuthService
    this.userData = this.authService.getUser();
  }

  // Logout method
  logout() {
    this.authService.clearUser();
    this.router.navigate(['/']); // Redirect to login or home
  }
}