import { Product } from '../../interfaces/products';

export class LoadProducts {
  static readonly type = '[Product] Load Product';
  constructor(public products: Product[]) {}
}
