import { action, observable, computed, comparer } from 'mobx';
import { createUser, updateUser, getAllUsers } from 'client/util/api';

class UserStore {
  @observable list: IUser[];
  @observable name: string = 'Jack';
  @observable email: string = 'your@email.com';
  @observable currentId: number;
  @observable users: {
    [key: string]: IUser;
  } = {};

  @computed({
    equals: comparer.identity,
  }) get current(): IUser {
    if (!this.currentId) {
      return null;
    }

    const user = this.users[this.currentId];
    return user;
  }

  constructor(init = {}) {
    Object.assign(this, init);
  }

  @action async getAll() {
    const users = await getAllUsers() as IUser[];
    users.forEach((user) => {
      this.users[user.id] = user;
    });
    this.list = users;
  }

  @action async create() {
    const user = await createUser(this.name, this.email);
    this.list.push(user);
  }

  @action async update() {
    const user = await updateUser(this.current.id,
      this.current.name, this.current.email);
    const target = this.list.find((i) => i.id === user.id);
    target.name = user.name;
    target.email = user.email;
    this.users[this.current.id] = user;
  }
}

export default UserStore;
