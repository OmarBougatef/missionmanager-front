import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatGridListModule,  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { cin, email } = this.loginForm.value;

      this.authService.login(cin, email).subscribe(
        () => {
          // Navigate to the home page after successful login
          this.router.navigate(['/home']);
        },
        () => {
          this.snackBar.open('Échec de la connexion : Veuillez vérifier vos informations.', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    } else {
      this.snackBar.open('Formulaire invalide : Veuillez corriger les erreurs.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }

  resetForm() {
    this.loginForm.reset(); // Reset the form
  }
}
