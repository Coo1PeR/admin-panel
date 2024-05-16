// import {Component} from '@angular/core';
// import {MatTableModule} from '@angular/material/table';
// import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
// import {MatButtonModule} from '@angular/material/button';
//
//
// export interface ShoppingList {
//   id: number;
//   title: string;
//   price: number;
//   quantity: number;
//   sum: number;
// }
//
// function calculateSum(price: number, quantity: number): number {
//   return price * quantity;
// }
//
// function createElement(id: number, title: string, price: number, quantity: number): ShoppingList {
//   return {
//     id,
//     title,
//     price,
//     quantity,
//     sum: +calculateSum(price, quantity).toFixed(2)
//   };
// }
//
// const ELEMENT_DATA: ShoppingList[] = [
//   createElement(1, 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 1.34, 10)
// ]
//
// @Component({
//   selector: 'app-shopping-list',
//   standalone: true,
//   imports: [MatTableModule, MatSort, MatSortHeader, MatButtonModule],
//   templateUrl: './shopping-list.component.html',
//   styleUrl: './shopping-list.component.scss'
// })
// export class ShoppingListComponent {
//   displayedColumns: string[] = ['id', 'title', 'price', 'quantity', 'sum'];
//   dataSource = ELEMENT_DATA;
//
//   decrease(element: any) {
//     element.quantity -= 1;
//     element.sum = +calculateSum(element.price, element.quantity).toFixed(2);
//   }
//
//   increase(element: any) {
//     element.quantity += 1;
//     element.sum = +calculateSum(element.price, element.quantity).toFixed(2);
//
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [MatTableModule, MatSort, MatSortHeader, MatButtonModule, CurrencyPipe, MatIcon],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})

export class ShoppingListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'price', 'quantity', 'total'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getCartsWithDetails().then(carts => {
      this.dataSource.data = carts;
      this.dataSource.sort = this.sort;
    });
  }
}
