import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports:[
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
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: User | null = null;
  profilePicture: string = 'profile.png';


  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the current user data
    this.user = this.authService.getUser();

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

  onSaveChanges(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.value };
      this.authService.setUser(updatedUser);
      console.log('User updated:', updatedUser);
      alert('Les modifications ont été enregistrées avec succès!');
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  onEditPhoto(): void {
    alert('Fonctionnalité pour changer la photo de profil à implémenter.');
  }
}
