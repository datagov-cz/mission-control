import React, { useState, MouseEvent } from 'react'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const PasswordTextField: React.FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleMouseDownPassword = (event: MouseEvent) => event.preventDefault()

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default PasswordTextField
