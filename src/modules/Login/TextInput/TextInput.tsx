import React, { FunctionComponent, ReactElement, useState } from 'react'
import './styles.css'

interface IProps {
  errorMessage?: string
  icon: ReactElement
  id: string
  onChange: (value: string) => void
  onBlur?: (value: string) => void
  placeholder: string
  type: string
  value: string
}

const TextInput: FunctionComponent<IProps> = (props: IProps): ReactElement => {
  const { errorMessage, icon, id, onChange, onBlur, placeholder, type, value } = props

  const [isValueEmpty, setIsValueEmpty] = useState(false)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value)
  }

  const handleOnblur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value
    setIsValueEmpty(inputValue === '')

    if (onBlur && inputValue !== '') {
      onBlur(inputValue)
    }
  }

  return (
    <div className='input-container'>
      <div>
        {icon}
        <input
          id={id}
          onChange={handleOnChange}
          onBlur={handleOnblur}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
      {errorMessage || isValueEmpty ? (
        <div className='error-message'>
          <div className='arrow-left' />
          {isValueEmpty ? `${placeholder} is required.` : errorMessage}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TextInput
