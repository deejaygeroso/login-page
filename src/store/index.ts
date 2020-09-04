import { decorate, observable } from 'mobx'

import LoginStore from './LoginStore'

class RootStore {
  LoginStore = new LoginStore()
}

decorate(RootStore, {
  LoginStore: observable,
})

const store = new RootStore()
export default store
