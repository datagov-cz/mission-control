import React from 'react'
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core'
import { RegisterOptions, useFormContext, useController } from 'react-hook-form'

import t from 'components/i18n'

type TextFieldProps = MuiTextFieldProps & {
  name: string
  rules: RegisterOptions
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  rules,
  defaultValue = '',
  ...restProps
}) => {
  const { control, errors } = useFormContext()
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <MuiTextField
      {...inputProps}
      {...restProps}
      inputRef={ref}
      error={!!errors[name]}
      helperText={errors[name]?.message ? t(errors[name]?.message) : undefined}
    />
  )
}

export default TextField
