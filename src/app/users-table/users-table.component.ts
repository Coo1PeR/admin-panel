import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DashboardService } from '../dashboard.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { UserFull } from '../interfaces/userFull';
import {
  MatProgressBar,
  MatProgressBarModule,
} from '@angular/material/progress-bar';

let userData: any[];

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    RouterModule,
    MatProgressBarModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersComponent implements OnInit, AfterViewInit {
  isLoading = true;

  displayedColumns: string[] = ['userFullName', 'phone', 'totalPurchase'];
  dataSource = new MatTableDataSource<UserFull>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  async ngOnInit() {
    this.loadData();
    this.dashboardService.getUsersChangedObservable().subscribe(() => {
      this.loadData();
    });

    console.log(this.dashboardService.users);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadData() {
    userData = this.dashboardService.getUserDataWithTotalPurchase();
    this.dataSource.data = userData;
    this.isLoading = false;
  }

  openUserDetailsDialog(user: UserFull) {
    this.dialog.open(UserCartComponent, {
      data: user,
    });
  }
}
