import React from 'react'
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from '@material-ui/core'
import { useFormContext, useController } from 'react-hook-form'

type CheckboxProps = MuiCheckboxProps & {
  label: React.ReactNode
  name: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  defaultChecked,
  ...restProps
}) => {
  const { control } = useFormContext()
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: defaultChecked,
  })

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          inputRef={ref}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          {...inputProps}
          {...restProps}
        />
      }
      label={label}
    />
  )
}

export default Checkbox
