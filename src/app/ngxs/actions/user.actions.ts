import { User } from '../../interfaces/users';

export class LoadUsers {
  static readonly type = '[User] Load Users';
  constructor(public users: User[]) {}
}
