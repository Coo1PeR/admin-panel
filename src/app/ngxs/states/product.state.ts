import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from '../../interfaces/products';
import { LoadProducts } from '../actions/product.actions';

export interface ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
  },
})
export class ProductState {
  @Selector()
  static products(state: ProductStateModel): Product[] {
    return state.products;
  }

  @Action(LoadProducts)
  loadProducts(ctx: StateContext<ProductStateModel>, action: LoadProducts) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      products: action.products,
    });
  }
}
