import React, { FunctionComponent, ReactElement } from 'react'

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

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value)
  }
  const handleOnblur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onBlur) {
      onBlur(event.target.value)
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
      <p className='error-message'>{errorMessage}</p>
    </div>
  )
}

export default TextInput
