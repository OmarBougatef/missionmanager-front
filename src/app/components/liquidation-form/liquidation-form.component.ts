import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LiquidationService } from '../../services/liquidation.service';
import { UserService } from '../../services/user.service';
import { MissionService } from '../../services/mission.service';
import { Liquidation, LiquidationStatus } from '../../models/liquidation';
import { OcrService } from '../../services/ocr.service';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liquidation-form',
  templateUrl: './liquidation-form.component.html',
  styleUrls: ['./liquidation-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
})
export class LiquidationFormComponent implements OnInit {
  liquidationForm!: FormGroup;
  users: any[] = [];
  missions: any[] = [];
  isUpdate: boolean = false;
  liquidationId?: number;

  constructor(
    private fb: FormBuilder,
    private liquidationService: LiquidationService,
    private userService: UserService,
    private missionService: MissionService,
    private router: Router,
    private ocrService: OcrService // Injecting the OcrService
  ) {
    this.liquidationForm = this.fb.group({
      missionId: ['', Validators.required],
      userId: ['', Validators.required],
      trainCost: [0, [Validators.required, Validators.min(0)]],
      busCost: [0, [Validators.required, Validators.min(0)]],
      taxiCost: [0, [Validators.required, Validators.min(0)]],
      otherTransportCost: [0, [Validators.required, Validators.min(0)]],
      internetPackageCost: [0, [Validators.required, Validators.min(0)]],
      simCardCost: [0, [Validators.required, Validators.min(0)]],
      hotelCost: [0, [Validators.required, Validators.min(0)]],
      remarks: [''],
      status: [LiquidationStatus.PENDING, Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const liquidation: Liquidation = navigation.extras.state['liquidation'];
      this.liquidationId = liquidation.id;
      this.isUpdate = true;
      this.prefillForm(liquidation);
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
    this.missionService.getMissions().subscribe((missions) => (this.missions = missions));
  }

  prefillForm(liquidation: Liquidation): void {
    this.liquidationForm.patchValue({
      missionId: liquidation.mission.id,
      userCin: liquidation.user.cin,
      trainCost: liquidation.trainCost,
      busCost: liquidation.busCost,
      taxiCost: liquidation.taxiCost,
      otherTransportCost: liquidation.otherTransportCost,
      internetPackageCost: liquidation.internetPackageCost,
      simCardCost: liquidation.simCardCost,
      hotelCost: liquidation.hotelCost,
      remarks: liquidation.remarks,
      status: liquidation.status,
    });
  }

  onSubmit(): void {
    if (this.liquidationForm.valid) {
      const liquidationData: Liquidation = this.liquidationForm.value; // Get the form data
  
      if (this.isUpdate && this.liquidationId) {
        // If it's an update, update the entire liquidation object
        this.liquidationService
          .updateLiquidation(this.liquidationId, liquidationData) // Pass the whole liquidation data to update
          .subscribe(() => {
            this.router.navigate(['/liquidations/list']);
          });
      } else {
        // If it's not an update, create a new liquidation
        this.liquidationService
          .createLiquidation(liquidationData) // Use create method for new liquidation
          .subscribe(() => {
            this.router.navigate(['/liquidations/list']);
          });
      }
    }
  }
  

  onFileUpload(event: Event, costType: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];

      // Call the OCR service to process the file
      this.ocrService.processImage(file, costType).subscribe(
        (response) => {
          // Assuming the OCR service returns a response with costType and amount
          const extractedCost = parseFloat(response.amount); // Ensure the amount is a number

          // Update the relevant cost field in the form dynamically
          if (!isNaN(extractedCost)) {
            this.liquidationForm.patchValue({
              [response.costType]: extractedCost,
            });
          }
        },
        (error) => {
          console.error('OCR processing error:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.liquidationForm.reset();
  }

  cancel(): void {
    this.router.navigate(['/liquidations/list']);
  }
}
