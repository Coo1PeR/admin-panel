import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../../interfaces/users';
import { LoadUsers } from '../actions/user.actions';

export interface UserStateModel {
  users: User[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
  },
})
export class UserState {
  @Selector()
  static users(state: UserStateModel): User[] {
    return state.users;
  }

  @Action(LoadUsers)
  loadUsers(ctx: StateContext<UserStateModel>, action: LoadUsers) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      users: action.users,
    });
  }
}
