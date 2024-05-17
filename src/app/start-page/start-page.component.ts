import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersComponent } from '../users-table/users-table.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserFull } from '../interfaces/userFull';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { DashboardService } from '../dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [MatTabsModule, UsersComponent, RouterModule, MatButtonModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {
  constructor(private dialog: MatDialog) {}

  openAddUser() {
    this.dialog.open(AddUserComponent, {});
  }
}
