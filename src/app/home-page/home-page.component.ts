import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    RouterModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  gridCols: number = 3;
  userRole: string = ''; // Store the user's role

  cards = [
    {
      title: 'Équipe',
      description: 'Consultez et gérez votre équipe.',
      icon: 'group',
      link: '/users/list',
      linkText: 'Voir la liste des collaborateurs',
      link2: '/users/add',
      linkText2: 'Ajouter un collaborateur',
      rolesAllowed: ['ADMIN', 'MANAGER'], // Allowed roles for these actions
    },
    {
      title: 'Déplacements',
      description: 'Consultez et gérez les déplacements.',
      icon: 'flight_takeoff',
      link: '/missions/list',
      linkText: 'Voir la liste des déplacements',
      link2: '/missions/add',
      linkText2: 'Ajouter un nouveau déplacement',
      rolesAllowed: ['ADMIN', 'MANAGER', 'COLLABORATEUR'],
    },
    {
      title: 'Liquidation',
      description: 'Consultez les liquidations de votre équipe.',
      icon: 'attach_money',
      link: '/liquidations/list',
      linkText: 'Consultez la liste des liquidations',
      link2: '/liquidations/add',
      linkText2: 'Faire une liquidation',
      rolesAllowed: ['ADMIN', 'MANAGER', 'COLLABORATEUR'], // Only Admin can access
    },
  ];

  constructor(private authService: AuthService, private router: Router,) {}

  ngOnInit(): void {
    // Fetch the user's role from AuthService
    const user = this.authService.getUser(); // Assuming AuthService has a method `getUser`
    console.log(user)
    if (user) {
      this.userRole = user.role;
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Helper method to check if the current user has access to a card action
  hasAccess(rolesAllowed: string[]): boolean {
    return rolesAllowed.includes(this.userRole);
  }
}
