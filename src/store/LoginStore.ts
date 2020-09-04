import { action, decorate, observable } from 'mobx'
import axios from 'axios'

class LoginStore {
  emailErrorMessage = ''
  isEmailValid = true
  emailErrorCodes = {
    5001: 'Invalid email format.',
    5002: 'Email already exist.',
    5003: 'Unable to validate email to the server.',
  }

  login = async (): Promise<void> => {
    console.log('login')
  }

  validateEmail = async (email: string): Promise<void> => {
    if (this.validateEmailFormat(email)) {
      const status = await this.getEmailStatus(email)
      this.validateEmailStatus(status)
    } else {
      this.setEmailErrorMessageCode(5001)
    }
  }

  getEmailStatus = async (email: string): Promise<string> => {
    const response = await axios.post(`https://api.raisely.com/v3/check-user`, {
      campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
      data: {
        email,
      },
    })
    return (response && response.data && response.data.data && response.data.data.status) || ''
  }

  // Code found on stackoverflow.
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript.
  validateEmailFormat = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  validateEmailStatus = (status: string): void => {
    if (status === 'OK') {
      this.clearEmailErrorMessage()
    } else if (status === 'EXISTS') {
      this.setEmailErrorMessageCode(5002)
    } else {
      this.setEmailErrorMessageCode(5003)
    }
  }

  setEmailErrorMessageCode = (errorCode: number): void => {
    this.emailErrorMessage = this.emailErrorCodes[errorCode]
    this.isEmailValid = false
  }

  clearEmailErrorMessage = (): void => {
    this.emailErrorMessage = ''
    this.isEmailValid = true
  }
}

decorate(LoginStore, {
  emailErrorMessage: observable,
  isEmailValid: observable,
  login: action,
  validateEmail: action,
})

export default LoginStore
