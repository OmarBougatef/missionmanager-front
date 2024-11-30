// src/app/user-list/user-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { MatTableDataSource } from '@angular/material/table'; // Importez MatTableDataSource ici
import { MatPaginator } from '@angular/material/paginator'; // Importez MatPaginator ici
import { MatTableModule } from '@angular/material/table'; // Ajoutez l'importation de MatTableModule
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule, // Ajoutez MatTableModule ici
    MatPaginator, // Laissez MatPaginator comme avant
  ]
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['cin', 'firstName', 'lastName', 'action'];
  dataSource = new MatTableDataSource<User>(); // Initialize the MatTableDataSource

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference to the paginator

  constructor(private userService: UserService,  private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
        // Fetch users from the service
        this.userService.getUsers().subscribe((data: User[]) => {
          this.dataSource.data = data; // Set the data for the table
          this.dataSource.paginator = this.paginator; // Assign the paginator to the data source
        });
  }

  editUser(user: User) {
    this.router.navigate(['users/add'], { state: { user } });
  }

  deleteUser(user: User) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(user.cin).subscribe(
        () => {
          this.showSnackBar('Utilisateur supprimé avec succès.', 'Fermer');
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.showSnackBar('Erreur lors de la suppression de l\'utilisateur.', 'Fermer');
        }
      );
    }
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
