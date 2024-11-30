// src/app/user-form/user-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user'; 
import { UserService } from '../../services/user.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule
  ],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      passportNumber: ['', Validators.required],
      passportIssueDate: ['', Validators.required],
      passportExpiryDate: ['', Validators.required],
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const user: User = navigation.extras.state['user'];
      this.prefillForm(user);
    }
  }

  prefillForm(user: User) {
    this.userForm.patchValue({
      cin: user.cin,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      birthDate: user.birthDate,
      gender: user.gender,
      nationality: user.nationality,
      passportNumber: user.passportNumber,
      passportIssueDate: user.passportIssueDate,
      passportExpiryDate: user.passportExpiryDate,
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          this.snackBar.open('Utilisateur créé avec succès!', 'Fermer', { duration: 3000 });
          this.router.navigate(['/users/list']); // Redirection vers la liste des utilisateurs
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la création de l\'utilisateur.', 'Fermer', { duration: 3000 });
          console.error('Erreur lors de la création de l\'utilisateur', error);
        }
      });
    }
  }
  resetForm() {
    this.userForm.reset();
  }

  cancel() {
    this.router.navigate(['/users/list']); // Redirect to user list page
  }
}
