import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
    MatGridListModule,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: User | null = null;
  profilePicture: string = 'profile.png';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch the user data from local storage (or use a service to fetch from the backend if needed)
    const userData = localStorage.getItem('userData');
    this.user = userData ? JSON.parse(userData) : null;

    // Initialize the form with the user's data
    this.profileForm = this.fb.group({
      cin: [this.user?.cin, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      lastName: [this.user?.lastName, Validators.required],
      firstName: [this.user?.firstName, Validators.required],
      phoneNumber: [this.user?.phoneNumber, [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: [this.user?.address, Validators.required],
      birthDate: [this.user?.birthDate, Validators.required],
      gender: [this.user?.gender, Validators.required],
      nationality: [this.user?.nationality, Validators.required],
      passportNumber: [this.user?.passportNumber, Validators.required],
      passportIssueDate: [this.user?.passportIssueDate, Validators.required],
      passportExpiryDate: [this.user?.passportExpiryDate, Validators.required],
    });
  }

  /**
   * Save changes to the user profile
   */
  onSaveChanges(): void {
    if (this.profileForm.valid && this.user) {
      const updatedUser: User = { ...this.user, ...this.profileForm.value };

      this.userService.updateUser(this.user.cin, updatedUser).subscribe(
        (updatedUserResponse) => {
          // Update local storage with the latest user data
          localStorage.setItem('userData', JSON.stringify(updatedUserResponse));
          this.snackBar.open('Les modifications ont été enregistrées avec succès!', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        (error) => {
          console.error('Error updating user:', error);
          this.snackBar.open('Échec de la mise à jour du profil.', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    } else {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }

  /**
   * Trigger profile picture edit (to be implemented)
   */
  onEditPhoto(): void {
    alert('Fonctionnalité pour changer la photo de profil à implémenter.');
  }
}
