import { User } from "./user"; // Importing User model

export enum MissionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED"
}

export class Mission {
  id?: number;                     
  title!: string;                   
  description!: string;             
  destination!: string;             
  startDate!: string;               
  endDate!: string;                 
  budget?: number;                  
  status!: MissionStatus;           
  userInfoCin!: number;             
  user!: User;                      

  constructor(
    title: string,
    description: string,
    destination: string,
    startDate: string,
    endDate: string,
    status: MissionStatus,
    userInfoCin: number,
    user: User,
    budget?: number
  ) {
    this.title = title;
    this.description = description;
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.userInfoCin = userInfoCin;
    this.user = user;
    this.budget = budget;
  }
}
