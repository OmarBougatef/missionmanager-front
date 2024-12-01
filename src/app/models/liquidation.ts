import { Mission, MissionStatus } from './mission';
import { User } from './user';

export enum LiquidationStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REFUSED = "REFUSED",
}

export class Liquidation {
  id!: number; // ID unique de la liquidation
  user!: User; // L'utilisateur associé à la liquidation
  mission!: Mission; // La mission associée
  trainCost!: number; // Coût des transports en train
  busCost!: number; // Coût des transports en bus
  taxiCost!: number; // Coût des taxis
  otherTransportCost!: number; // Coût d'autres types de transport
  internetPackageCost!: number; // Coût des forfaits internet
  simCardCost!: number; // Coût des cartes SIM
  hotelCost!: number; // Coût des hôtels
  totalAmount!: number; // Total des dépenses (calculé automatiquement)
  date!: Date; // Date de la liquidation
  status!: LiquidationStatus; // État de la liquidation
  remarks?: string; // Observations ou remarques sur la liquidation

  constructor(data?: Partial<Liquidation>) {
    if (data) {
      this.id = data.id || 0;
      this.user = data.user || new User();
      this.mission = data.mission || new Mission(); // Adjusted to match Mission constructor
      this.trainCost = data.trainCost || 0;
      this.busCost = data.busCost || 0;
      this.taxiCost = data.taxiCost || 0;
      this.otherTransportCost = data.otherTransportCost || 0;
      this.internetPackageCost = data.internetPackageCost || 0;
      this.simCardCost = data.simCardCost || 0;
      this.hotelCost = data.hotelCost || 0;

      // Calcul automatique du montant total
      this.totalAmount =
        (data.trainCost || 0) +
        (data.busCost || 0) +
        (data.taxiCost || 0) +
        (data.otherTransportCost || 0) +
        (data.internetPackageCost || 0) +
        (data.simCardCost || 0) +
        (data.hotelCost || 0);

      this.date = data.date ? new Date(data.date) : new Date();
      this.status = data.status || LiquidationStatus.PENDING;
      this.remarks = data.remarks || '';
    }
  }
}
