import Store from './Store';

class RootStore {
  Store = new Store();
}

const store = new RootStore();

export default store;
