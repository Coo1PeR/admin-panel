import { Cart } from '../../interfaces/carts';

export class LoadCarts {
  static readonly type = '[Cart] Load Carts';
  constructor(public carts: Cart[]) {}
}
