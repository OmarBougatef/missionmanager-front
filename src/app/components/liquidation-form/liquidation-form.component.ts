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

@Component({
  selector: 'app-liquidation-form',
  templateUrl: './liquidation-form.component.html',
  styleUrls: ['./liquidation-form.component.css'],
  standalone: true,
  imports: [
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
    private ocrService: OcrService  // Injecting the OcrService
  ) {
    this.liquidationForm = this.fb.group({
      missionId: ['', Validators.required],
      userCin: ['', Validators.required],
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
      const liquidationData: Liquidation = this.liquidationForm.value;

      if (this.isUpdate && this.liquidationId) {
        this.liquidationService
          .updateLiquidation({ ...liquidationData, id: this.liquidationId })
          .subscribe(() => this.router.navigate(['/liquidations/list']));
      } else {
        this.liquidationService
          .addLiquidation(liquidationData)
          .subscribe(() => this.router.navigate(['/liquidations/list']));
      }
    }
  }

  // Modified onFileUpload to handle OCR service
  onFileUpload(event: Event, costType: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];

      // Call the OCR service to process the file
      this.ocrService.processImage(file, costType).subscribe(
        (response) => {
          // Assuming the OCR service returns the extracted amount
          const extractedCost = response.amountCost;  // Adjust according to the OCR response

          // Update the relevant cost field in the form
          this.liquidationForm.patchValue({
            [costType]: extractedCost,
          });
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
