import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sof-travel-frontend';
  constructor(private router: Router) {}
  isLoginPage(): boolean {
    return this.router.url === '/login'; // Vérifie si l'URL actuelle est '/login'
  }
}
