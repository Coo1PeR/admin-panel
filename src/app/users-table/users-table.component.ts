import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {DashboardService} from "../dashboard.service";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {User} from '../interfaces/users';
import {MatDialog} from "@angular/material/dialog";
import {UserCartComponent} from "../user-cart/user-cart.component";
import {UserFull} from "../interfaces/userFull";


let userData: any[];

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, RouterModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})

export class UsersComponent implements AfterViewInit {

  usersFromTable: any;

  displayedColumns: string[] = ['userFullName', 'phone', 'totalPurchase'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  async ngAfterViewInit() {
    await this.dashboardService.initializeData();
    userData = this.dashboardService.getUserDataWithTotalPurchase();
    this.dataSource.data = userData;
    this.dataSource.sort = this.sort;
    this.usersFromTable = userData
  }

  openUserDetailsDialog(user: UserFull) {
    this.dialog.open(UserCartComponent, {
      data: user
    });
  }
}
