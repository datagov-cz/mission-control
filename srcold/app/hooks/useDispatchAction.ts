import { useDispatch } from 'react-redux'
import { Action } from 'app/types'

const useDispatchAction = (action: Action) => {
  const dispatch = useDispatch()
  return () => dispatch(action)
}

export default useDispatchAction
