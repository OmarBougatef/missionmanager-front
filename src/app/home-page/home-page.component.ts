import { Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importer CommonModule

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    RouterModule,],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  gridCols: number = 3;

  cards = [
    {
      title: 'Équipe',
      description: 'Consultez et gérez votre équipe.',
      icon: 'group',
      link: '/users/list',
      linkText: 'Voir la liste des collaborateurs',
      link2: '/users/add',
      linkText2: 'Ajouter un collaborateur'
    },
    {
      title: 'Déplacements',
      description: 'Consultez et gérez les déplacements.',
      icon: 'flight_takeoff',
      link: '/missions/list',
      linkText: 'Voir la liste des déplacements',
      link2: '/missions/add',
      linkText2: 'Ajouter un nouveau déplacement'
    },
    {
      title: 'Liquidation',
      description: 'Consultez les liquidations de votre équipe.',
      icon: 'attach_money',
      link: '/liquidations/list',
      linkText: 'Consultez la liste des liquidations'
    }
  ];

}
