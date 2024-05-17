import { Component, Inject, Input, OnInit } from '@angular/core';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { DashboardService } from '../dashboard.service';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFull } from '../interfaces/userFull';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [
    ShoppingListComponent,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
  ],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.scss',
})
export class UserCartComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserFull,
    private dashboardService: DashboardService,
  ) {}
}
