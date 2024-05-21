import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFull } from '../interfaces/userFull';
import { Purchases } from '../interfaces/purchases';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSort,
    MatSortHeader,
    MatButtonModule,
    CurrencyPipe,
    MatIcon,
    MatProgressBarModule,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit, AfterViewInit {
  purchases: Purchases[] = [];
  displayedColumns: string[] = ['title', 'price', 'quantity', 'sum'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserFull,
    private dashboardService: DashboardService,
  ) {}

  async ngOnInit() {
    if (this.data && this.data.id) {
      this.purchases = await this.dashboardService.getPurchases(this.data.id);
      this.dataSource.data = this.purchases;
      this.isLoading = false;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  increaseQuantity(purchase: Purchases) {
    purchase.quantity++;
    purchase.sum = purchase.quantity * purchase.price;
    this.dashboardService.updatePurchase(this.data.id, purchase);
  }

  decreaseQuantity(purchase: Purchases) {
    if (purchase.quantity > 0) {
      purchase.quantity--;
      purchase.sum = purchase.quantity * purchase.price;
      this.dashboardService.updatePurchase(this.data.id, purchase);
    }
  }
}
