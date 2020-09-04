import { action, decorate, observable } from 'mobx'
import { ILoginData } from '../common/interfaces'
import axios from 'axios'

class LoginStore {
  apiServerURL = 'https://api.raisely.com/v3'
  campaignUuid = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a'
  emailErrorCodes = {
    5001: 'Invalid email format.',
    5002: 'Email already exist.',
    5003: 'Unable to validate email to the server.',
  }
  emailErrorMessage = ''
  isEmailValid = true

  login = async (data: ILoginData): Promise<void> => {
    try {
      const response = await axios.post(`${this.apiServerURL}/signup`, {
        campaignUuid: this.campaignUuid,
        data,
      })
      const loginMessage = (response && response.data && response.data.message) || ''
      alert(loginMessage)
    } catch (error) {
      alert('There was an error encountered on the server. Probably your email has already signed-in.')
    }
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
    const response = await axios.post(`${this.apiServerURL}/check-user`, {
      campaignUuid: this.campaignUuid,
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
