import { Injectable } from '@angular/core';
import { User } from './interfaces/users';
import { Product } from './interfaces/products';
import { Cart } from './interfaces/carts';
import { UserFull } from './interfaces/userFull';
import { Purchases } from './interfaces/purchases';
import { Store } from '@ngxs/store';
import { LoadUsers } from './ngxs/actions/user.actions';
import { LoadProducts } from './ngxs/actions/product.actions';
import { LoadCarts } from './ngxs/actions/cart.actions';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url: string = 'https://fakestoreapi.com';
  users: User[] = [];
  carts: Cart[] = [];
  products: Product[] = [];
  userFull: UserFull[] = [];

  private usersChanged = new Subject<void>();
  private purchasesChanged = new Subject<void>();

  //constructor(private store: Store) {}
  constructor() {}

  getUsersChangedObservable() {
    return this.usersChanged.asObservable();
  }

  notifyUsersChanged() {
    this.usersChanged.next();
  }

  getPurchasesChangedObservable() {
    return this.purchasesChanged.asObservable();
  }

  notifyPurchasesChanged() {
    this.purchasesChanged.next();
  }

  async initializeData() {
    this.users = await this.getAllUsers();
    this.carts = await this.getAllCarts();
    this.products = await this.getAllProducts();

    // // Диспатчим действия для обновления хранилища NGXS
    // this.store.dispatch(new LoadUsers(this.users));
    // this.store.dispatch(new LoadCarts(this.carts));
    // this.store.dispatch(new LoadProducts(this.products));
  }

  async initializeAndFetchData(action: () => void) {
    await this.initializeData();
    action();
  }

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(`${this.url}/users`, {});
    return (await data.json()) ?? [];
  }

  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(`${this.url}/products`, {});
    return (await data.json()) ?? [];
  }

  async getAllCarts(): Promise<Cart[]> {
    const data = await fetch(`${this.url}/carts`, {});
    return (await data.json()) ?? [];
  }

  getUserDataWithTotalPurchase(): UserFull[] {
    this.userFull = this.users.map((user) => {
      const userCarts = this.carts.filter((cart) => cart.userId === user.id);
      let totalPurchase: number = 0;
      let userFullName: string = `${user.name.lastname.charAt(0).toUpperCase()}${user.name.lastname.slice(1)} ${user.name.firstname.charAt(0).toUpperCase()}${user.name.firstname.slice(1)}`;
      if (userCarts.length > 0) {
        userCarts.forEach((cart) => {
          cart.products.forEach((product) => {
            const productData = this.products.find(
              (p) => p.id === product.productId,
            );
            if (productData) {
              totalPurchase += productData.price * product.quantity;
            }
          });
        });
      }
      totalPurchase = +totalPurchase.toFixed(2);
      return { ...user, totalPurchase, userFullName };
    });
    return this.userFull;
  }

  async loginApplication(login: string, password: string) {
    console.log(login, password);
    await this.initializeData();
    console.log(this.users);
  }

  addUser(lastName: string, firstName: string, email: string, phone: string) {
    const newUser: User = {
      id: this.users.length
        ? Math.max(...this.users.map((user) => user.id)) + 1
        : 1,
      name: { lastname: lastName, firstname: firstName },
      email: email,
      phone: phone,
      username: `${firstName}${lastName.split('').shift()}`,
      password: '',
      __v: 0,
      address: {
        geolocation: { lat: +'', long: +'' },
        city: '',
        street: '',
        number: 0,
        zipcode: '',
      },
    };
    this.users.push(newUser);
    console.log(`New user added:`, newUser);
    this.getUserDataWithTotalPurchase();
    this.notifyUsersChanged(); // Уведомляем об изменении списка пользователей
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }

  async getPurchases(userId: number): Promise<Purchases[]> {
    // Имитируем получение данных о покупках
    const userCarts = this.carts.filter((cart) => cart.userId === userId);
    const purchases: Purchases[] = [];
    for (const cart of userCarts) {
      for (const product of cart.products) {
        const productData = this.products.find(
          (p) => p.id === product.productId,
        );
        if (productData) {
          purchases.push({
            ...productData,
            quantity: product.quantity,
            sum: product.quantity * productData.price,
          });
        }
      }
    }
    return purchases;
  }
  async updatePurchase(userId: number, purchase: Purchases) {
    // Найти все корзины пользователя
    const userCarts = this.carts.filter((cart) => cart.userId === userId);

    // Найти id товара по названию
    const productId = this.products.find((p) => p.title === purchase.title)?.id;

    if (productId) {
      let remainingQuantity = purchase.quantity;

      for (let cart of userCarts) {
        const productInCart = cart.products.find(
          (p) => p.productId === productId,
        );

        if (productInCart) {
          // Обновить количество товара в корзине
          if (remainingQuantity > 0) {
            productInCart.quantity = remainingQuantity;
            remainingQuantity = 0;
          } else {
            productInCart.quantity = 0; // Или удалить товар из корзины, если количество = 0
          }
        } else if (remainingQuantity > 0) {
          // Если товара нет в корзине, добавьте его
          cart.products.push({ productId, quantity: remainingQuantity });
          remainingQuantity = 0;
        }

        // Обновите корзину на сервере (если это необходимо)
        // Здесь можно сделать PUT запросы для обновления каждой корзины на сервере
        // Пример:
        // await fetch(`${this.url}/carts/${cart.id}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(cart),
        // });
      }
    }
    this.notifyPurchasesChanged(); // Уведомляем об изменении покупок
  }
}
