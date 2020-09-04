import { action, decorate, observable } from 'mobx'

class LoginStore {
  email = ''
  validateEmail = async (): Promise<void> => {
    //
  }
}

decorate(LoginStore, {
  email: observable,
  validateEmail: action,
})

export default LoginStore
