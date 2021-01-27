import React, {
  useCallback,
  unstable_useTransition as useTransition,
  SuspenseConfig,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from '@material-ui/core'

type SubmitButtonProps = Omit<ButtonProps, 'onClick'> & {
  onClick: (data: any) => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, ...rest }) => {
  const { handleSubmit } = useFormContext()
  const [startTransition, isPending] = useTransition({
    timeoutMs: 5000,
  } as SuspenseConfig)

  const combinedOnSubmit = useCallback(() => {
    if (onClick) {
      startTransition(() => {
        handleSubmit(onClick)()
      })
    }
  }, [handleSubmit, onClick])

  return (
    <Button
      color="primary"
      variant="contained"
      fullWidth
      size="large"
      onClick={combinedOnSubmit}
      disabled={isPending}
      {...rest}
    />
  )
}

export default SubmitButton
