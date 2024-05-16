import { Injectable } from '@angular/core';
import { User } from "./interfaces/users";
import { Product } from "./interfaces/products";
import { Cart } from "./interfaces/carts";
import {UserFull} from "./interfaces/userFull";

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  url: string = 'https://fakestoreapi.com';
  users: User[] = [];
  carts: Cart[] = [];
  products: Product[] = [];

  constructor() {}

  async initializeData() {
    this.users = await this.getAllUsers();
    this.carts = await this.getAllCarts();
    this.products = await this.getAllProducts();
  }

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(`${this.url}/users`, {})
    return await data.json() ?? [];
  }

  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(`${this.url}/products`, {})
    return await data.json() ?? [];
  }

  async getAllCarts(): Promise<Cart[]> {
    const data = await fetch(`${this.url}/carts`, {})
    return await data.json() ?? [];
  }

  getUserDataWithTotalPurchase(): UserFull[] {
    return this.users.map(user => {
      const userCarts = this.carts.filter(cart => cart.userId === user.id);
      let totalPurchase: number = 0;
      let userFullName: string = `${user.name.lastname.charAt(0).toUpperCase()}${user.name.lastname.slice(1)} ${user.name.firstname.charAt(0).toUpperCase()}${user.name.firstname.slice(1)}`;
      if (userCarts.length > 0) {
        userCarts.forEach(cart => {
          cart.products.forEach(product => {
            const productData = this.products.find(p => p.id === product.productId);
            if (productData) {
              totalPurchase += productData.price * product.quantity;
            }
          });
        });
      }
      totalPurchase = +totalPurchase.toFixed(2);
      return { ...user, totalPurchase, userFullName };
    });
  }

  loginApplication(login: string, password: string) {
    console.log(login, password)
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find(product => product.id === productId);
  }

  async getCartsWithDetails(): Promise<any[]> {
    await this.initializeData();
    return this.carts.map(cart => {
      const cartDetails = cart.products.map(product => {
        const productData = this.products.find(p => p.id === product.productId);
        if (productData) {
          return {
            ...productData,
            quantity: product.quantity,
            total: product.quantity * productData.price
          };
        } else {
          return null; // Добавляем обработку случая, когда productData не найден
        }
      }).filter(Boolean);
      console.log(cartDetails)
      return { ...cart, cartDetails };
    });
  }
}
