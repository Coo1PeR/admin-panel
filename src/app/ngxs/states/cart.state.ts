import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Cart } from '../../interfaces/carts';
import { LoadCarts } from '../actions/cart.actions';
import { Product } from '../../interfaces/products';
import { ProductStateModel } from './product.state';

export interface CartStateModel {
  carts: Cart[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    carts: [],
  },
})
export class CartState {
  @Selector()
  static carts(state: CartStateModel): Cart[] {
    return state.carts;
  }

  @Action(LoadCarts)
  loadCarts(ctx: StateContext<CartStateModel>, action: LoadCarts) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      carts: action.carts,
    });
  }
}
