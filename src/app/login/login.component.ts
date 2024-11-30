import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { cin, email } = this.loginForm.value;

      // Create a mock user
      const user: User = {
        cin,
        email,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123456789',
        address: '123 Main St',
        birthDate: '1990-01-01',
        gender: 'Male',
        nationality: 'Tunisian',
        passportNumber: 'AB1234567',
        passportIssueDate: '2020-01-01',
        passportExpiryDate: '2030-01-01',
      };

      this.authService.setUser(user);
      this.router.navigate(['/home']);
    } else {
      console.error('Formulaire invalide.');
    }
  }

  resetForm() {
    this.loginForm.reset(); // Réinitialisation du formulaire
  }
}
