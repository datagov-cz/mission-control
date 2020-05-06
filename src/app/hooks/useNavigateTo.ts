import { useDispatch } from 'react-redux'
import Actions from 'app/actions'
import { RouteName } from 'app/types'

const useNavigateTo = (routeName: RouteName) => {
  const dispatch = useDispatch()
  return () => dispatch(Actions.Router.navigateTo(routeName))
}

export default useNavigateTo
