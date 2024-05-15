import {AfterViewInit, Component, inject, ViewChild, OnInit} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})

// export class UsersComponent implements AfterViewInit {
//
//   displayedColumns: string[] = ['name', 'lastVisit', 'amount'];
//   dataSource = new MatTableDataSource<User>();
//
//   constructor(
//     private _liveAnnouncer: LiveAnnouncer,
//     private dashboardService: DashboardService
//   ) {}
//
//   @ViewChild(MatSort, { static: true }) sort!: MatSort;
//
//   ngAfterViewInit() {
//     this.getAllUsers();
//     this.dataSource.sort = this.sort; // Устанавливаем сортировку после загрузки данных
//   }
//
//   getAllUsers() {
//     this.dashboardService.getAllUsers().then((users: User[]) => {
//       this.dataSource.data = users;
//     });
//   }
//
//   /** Announce the change in sort state for assistive technology. */
//   announceSortChange(sortState: Sort) {
//     if (sortState.direction) {
//       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
//     } else {
//       this._liveAnnouncer.announce('Sorting cleared');
//     }
//   }
// }

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['userFullName', 'phone', 'totalPurchase'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dashboardService: DashboardService) { }

  async ngOnInit() {
    // Получаем данные о пользователях, корзинах и продуктах
    const users = await this.dashboardService.getAllUsers();
    const carts = await this.dashboardService.getAllCarts();
    const products = await this.dashboardService.getAllProducts();

    // Преобразуем данные о пользователях, чтобы добавить информацию о сумме покупок
    const usersWithTotalPurchase = users.map(user => {
      const userCarts = carts.filter(cart => cart.userId === user.id);
      let totalPurchase: number = 0;
      let userFullName: string = `${user.name.lastname.charAt(0).toUpperCase()}${user.name.lastname.slice(1)} ${user.name.firstname.charAt(0).toUpperCase()}${user.name.firstname.slice(1)}`;
      // Проверяем наличие покупок у пользователя
      if (userCarts.length > 0) {
        userCarts.forEach(cart => {
          cart.products.forEach(product => {
            const productData = products.find(p => p.id === product.productId);
            if (productData) {
              totalPurchase += productData.price * product.quantity;
            }
          });
        });
      }
      totalPurchase = +totalPurchase.toFixed(2)
      return { ...user, totalPurchase, userFullName };
    });

    // Устанавливаем источник данных для таблицы
    this.dataSource.data = usersWithTotalPurchase;

    // Устанавливаем сортировку
    this.dataSource.sort = this.sort;
  }

}

