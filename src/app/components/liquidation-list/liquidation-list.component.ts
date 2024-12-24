import { Component, OnInit } from '@angular/core';
import { Liquidation, LiquidationStatus } from '../../models/liquidation';
import { LiquidationService } from '../../services/liquidation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table'; // Import MatTableDataSource
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liquidation-list',
  templateUrl: './liquidation-list.component.html',
  styleUrls: ['./liquidation-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class LiquidationListComponent implements OnInit {
  liquidations: Liquidation[] = [];
  displayedColumns: string[] = [
    'id', 'userName', 'missionId', 'budget', 'totalAmount', 'status', 'actions'
  ];

  dataSource = new MatTableDataSource<Liquidation>(); // Initialize dataSource

  constructor(private liquidationService: LiquidationService, private router: Router) {}

  ngOnInit() {
    // Fetch liquidations for the current authenticated user or you can call specific methods here
    this.fetchLiquidations();
  }

  // Method to fetch liquidations for the current authenticated user
  fetchLiquidations() {
    this.liquidationService.getAllLiquidations().subscribe((data) => {
      this.liquidations = data;
      this.dataSource.data = this.liquidations; // Set the data for MatTableDataSource
    });
  }

  // Method for editing a liquidation (implement according to your app's requirements)
  editLiquidation(liquidation: Liquidation) {
    this.router.navigate(['/liquidations/add'], { state: { liquidation } });
    console.log(`Edit liquidation with ID: ${liquidation.id}`);
  }

// Method to validate a liquidation
validateLiquidation(id: number) {
  this.liquidationService.updateLiquidationStatusToValidated(id).subscribe(() => {
    this.fetchLiquidations(); // Refresh the list after validation
  });
}

// Method to refuse a liquidation
refuseLiquidation(id: number) {
  this.liquidationService.updateLiquidationStatusToRefused(id).subscribe(() => {
    this.fetchLiquidations(); // Refresh the list after refusal
  });
}


  // If needed, you can also implement pagination logic here by adding MatPaginator
  // MatPaginator logic can be added in a method like onPageChange(pageEvent) if you want to handle page changes manually
}
