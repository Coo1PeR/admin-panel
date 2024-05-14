import { Injectable } from '@angular/core';
import {User} from "./interfaces/users";
import {Product} from "./interfaces/products";
import {Cart} from "./interfaces/carts";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url: string = 'https://fakestoreapi.com';

  async getAllUsers() : Promise<User[]> {
    const data = await fetch(`${this.url}/users`, {})
    return await data.json() ?? [];
  }

  async getAllProducts() : Promise<Product[]> {
    const data = await fetch(`${this.url}/products`, {})
    return await data.json() ?? [];
  }

  async getAllCarts() : Promise<Cart[]> {
    const data = await fetch(`${this.url}/carts`, {})
    return await data.json() ?? [];
  }

  constructor() { }

  loginApplication (login: string, password: string) {
    console.log(login, password)
  }
}
