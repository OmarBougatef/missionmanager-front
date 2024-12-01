import { Component, OnInit } from '@angular/core';
import { Liquidation, LiquidationStatus } from '../../models/liquidation';
import { LiquidationService } from '../../services/liquidation.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table'; // Assurez-vous d'importer MatTableDataSource

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

  dataSource = new MatTableDataSource<Liquidation>; // Ajout de la propriété dataSource

  constructor(private liquidationService: LiquidationService) {}

  ngOnInit() {
    // Récupérer les liquidations depuis le service
    this.liquidationService.getLiquidations().subscribe((data) => {
      this.liquidations = data;
      this.dataSource = new MatTableDataSource(this.liquidations); // Initialiser dataSource avec les liquidations
    });
  }

  // Méthode pour éditer la liquidation (à compléter selon l'application)
  editLiquidation(id: number) {
    // Implémenter la logique d'édition ici
    console.log(`Éditer la liquidation avec ID: ${id}`);
  }

  // Méthode pour valider une liquidation
  validateLiquidation(id: number) {
    this.liquidationService.updateLiquidationStatus(id, LiquidationStatus.VALIDATED).subscribe(() => {
      this.ngOnInit(); // Rafraîchit la liste après validation
    });
  }

  // Méthode pour refuser une liquidation
  refuseLiquidation(id: number) {
    this.liquidationService.updateLiquidationStatus(id, LiquidationStatus.REFUSED).subscribe(() => {
      this.ngOnInit(); // Rafraîchit la liste après refus
    });
  }
}
