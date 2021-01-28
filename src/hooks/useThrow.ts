import { useCallback, useState } from 'react'

const useThrow = () => {
  const [, setState] = useState()
  const callback = useCallback(
    (error: Error) =>
      setState(() => {
        throw error
      }),
    [setState]
  )
  return callback
}

export default useThrow
