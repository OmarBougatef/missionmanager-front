import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MissionService } from '../../services/mission.service';
import { UserService } from '../../services/user.service';
import { MatNativeDateModule } from '@angular/material/core';
import { Mission } from '../../models/mission';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
})
export class MissionFormComponent implements OnInit {
  missionForm!: FormGroup;
  users: any[] = []; // List of users to populate the dropdown
  isUpdate: boolean = false; // Flag to check if it's an update
  missionId?: number; // Store mission ID for updates

  constructor(
    private fb: FormBuilder,
    private missionService: MissionService,
    private userService: UserService,
    private router: Router
  ) {
    // Initialize the form
    this.missionForm = this.fb.group({
      title: ['', Validators.required],
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [null, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      userInfoCin: ['', Validators.required]
    });

    // Fetch the list of users for the dropdown
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    // Get the navigation state to determine if we're updating
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const mission: Mission = navigation.extras.state['mission'];
      this.missionId = mission.id; // Assume the mission object has an 'id' property
      this.isUpdate = true; // Set update flag
      this.prefillForm(mission); // Prefill the form with mission data
    }
  }

  prefillForm(mission: Mission) {
    this.missionForm.patchValue({
      title: mission.title,
      destination: mission.destination,
      startDate: mission.startDate,
      endDate: mission.endDate,
      budget: mission.budget,
      status: mission.status,
      userInfoCin: mission.userInfoCin
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.missionForm.valid) {
      const missionData: Mission = this.missionForm.value;

      if (this.isUpdate && this.missionId) {
        // If updating, call the update service method
        this.missionService.updateMission(this.missionId, missionData).subscribe(() => {
          this.router.navigate(['/missions/list']);
        });
      } else {
        // If creating, call the create service method
        this.missionService.createMission(missionData).subscribe(() => {
          this.router.navigate(['/missions/list']);
        });
      }
    }
  }

  resetForm(): void {
    this.missionForm.reset();
  }

  cancel(): void {
    this.router.navigate(['/missions/list']);
  }
}
