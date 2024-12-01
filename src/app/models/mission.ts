import { User } from "./user";

export enum MissionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export class Mission {
  id?: number; // Facultatif
  title!: string; // Obligatoire
  description!: string; // Obligatoire
  destination!: string; // Obligatoire
  startDate!: string; // Obligatoire
  endDate!: string; // Obligatoire
  budget?: number; // Facultatif
  status!: MissionStatus; // Obligatoire
  userInfoCin!: number; // Obligatoire
  user!: User; // Obligatoire

  constructor(data?: Partial<Mission>) {
    if (data) {
      this.id = data.id || 0;
      this.title = data.title || 'Mission Sans Titre';
      this.description = data.description || 'Aucune description fournie';
      this.destination = data.destination || 'Destination inconnue';
      this.startDate = data.startDate || new Date().toISOString();
      this.endDate = data.endDate || new Date().toISOString();
      this.budget = data.budget || 0;
      this.status = data.status || MissionStatus.PENDING; // Valeur par défaut : PENDING
      this.userInfoCin = data.userInfoCin || 0;
      this.user = data.user || new User(); // Instance par défaut d'un utilisateur
    }
  }
}
