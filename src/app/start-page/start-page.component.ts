import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersComponent } from '../users-table/users-table.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserFull } from '../interfaces/userFull';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { DashboardService } from '../dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    MatTabsModule,
    UsersComponent,
    RouterModule,
    MatButtonModule,
    StatisticsComponent,
    MatProgressBarModule,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {
    this.initializeDashboardData();
  }

  async initializeDashboardData() {
    await this.dashboardService.initializeData();
    this.isLoading = false; // Закончили загрузку, теперь можно отрисовывать страницу
  }

  openAddUser() {
    this.dialog.open(AddUserComponent, {});
  }
}
