import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Liquidation, LiquidationStatus } from '../models/liquidation';
import { Mission, MissionStatus } from '../models/mission';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LiquidationService {
  private liquidations: Liquidation[] = [];

  constructor() {
    this.initializeMockData(); // Initialisation des données mockées
  }

  /**
   * Récupérer toutes les liquidations.
   */
  getLiquidations(): Observable<Liquidation[]> {
    return of(this.liquidations);
  }

  /**
   * Récupérer une liquidation par ID.
   * @param id ID de la liquidation
   */
  getLiquidationById(id: number): Observable<Liquidation | undefined> {
    const liquidation = this.liquidations.find(l => l.id === id);
    return of(liquidation);
  }

  /**
   * Ajouter une nouvelle liquidation.
   * @param liquidation Nouvelle liquidation
   */
  addLiquidation(liquidation: Liquidation): Observable<Liquidation> {
    liquidation.id = this.liquidations.length + 1; // ID unique auto-généré
    this.liquidations.push(liquidation);
    return of(liquidation);
  }

  /**
   * Mettre à jour une liquidation existante.
   * @param updatedLiquidation Liquidation mise à jour
   */
  updateLiquidation(updatedLiquidation: Liquidation): Observable<Liquidation> {
    const index = this.liquidations.findIndex(l => l.id === updatedLiquidation.id);
    if (index !== -1) {
      this.liquidations[index] = updatedLiquidation;
      return of(updatedLiquidation);
    }
    throw new Error('Liquidation non trouvée');
  }

  /**
   * Supprimer une liquidation par ID.
   * @param id ID de la liquidation à supprimer
   */
  deleteLiquidation(id: number): Observable<boolean> {
    const index = this.liquidations.findIndex(l => l.id === id);
    if (index !== -1) {
      this.liquidations.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  /**
   * Mettre à jour le statut d'une liquidation.
   * @param id ID de la liquidation
   * @param status Nouveau statut (VALIDATED ou REFUSED)
   */
  updateLiquidationStatus(id: number, status: LiquidationStatus): Observable<Liquidation | undefined> {
    const liquidation = this.liquidations.find(l => l.id === id);
    if (liquidation) {
      liquidation.status = status;
      return of(liquidation);
    }
    throw new Error('Liquidation non trouvée');
  }

  /**
   * Initialisation des données mockées pour le développement.
   */
  private initializeMockData(): void {
    const mockUser = new User({
      cin: 123456,
      firstName: 'Alice',
      lastName: 'Doe',
      email: 'alice@example.com',
    });

    const mockMission = new Mission({
      id: 1,
      title: 'Mission à Paris',
      description: 'Une mission importante à Paris',
      destination: 'Paris',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      budget: 5000,
      status: MissionStatus.COMPLETED,
      user: mockUser,
    });

    this.liquidations = [
      new Liquidation({
        id: 1,
        user: mockUser,
        mission: mockMission,
        trainCost: 100,
        busCost: 50,
        taxiCost: 30,
        otherTransportCost: 20,
        internetPackageCost: 15,
        simCardCost: 10,
        hotelCost: 300,
        status: LiquidationStatus.VALIDATED,
      }),
      new Liquidation({
        id: 2,
        user: mockUser,
        mission: mockMission,
        trainCost: 50,
        busCost: 20,
        taxiCost: 15,
        otherTransportCost: 10,
        internetPackageCost: 5,
        simCardCost: 5,
        hotelCost: 200,
        status: LiquidationStatus.PENDING,
      }),
      new Liquidation({
        id: 3,
        user: mockUser,
        mission: mockMission,
        trainCost: 120,
        busCost: 60,
        taxiCost: 40,
        otherTransportCost: 30,
        internetPackageCost: 20,
        simCardCost: 15,
        hotelCost: 400,
        status: LiquidationStatus.REFUSED,
      }),
    ];
  }
}
