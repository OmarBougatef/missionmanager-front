// src/app/mission-list/mission-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { Mission } from '../../models/mission';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css'],
  standalone: true,
  imports: [ CommonModule,
     MatButtonModule,
      MatTableModule, 
      MatPaginator,
      MatFormFieldModule,
      MatProgressSpinnerModule]
})
export class MissionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'destination', 'startDate', 'endDate', 'user', 'status', 'actions'];
  dataSource = new MatTableDataSource<Mission>();
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private missionService: MissionService,
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.missionService.getMissions().subscribe((missions: Mission[]) => {
      this.populateUserNames(missions);
      this.dataSource.data = missions;
      this.dataSource.paginator = this.paginator;
    });
  }


  private populateUserNames(missions: Mission[]) {
    missions.forEach((mission) => {
      this.userService.getUserByCin(mission.userInfoCin).subscribe((user) => {
        mission.user = user;
      });
    });

  }

  editMission(mission: Mission) {
    this.router.navigate(['/missions/add'], { state: { mission } });
  }

  deleteMission(id: number) {
    if (confirm('Are you sure you want to delete this mission?')) {
      this.missionService.deleteMission(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((m) => m.id !== id);
      });
    }
  }
}
