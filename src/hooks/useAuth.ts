import { useContext } from 'react'
import { AuthContext } from 'components/Auth'

const useAuth = () => useContext(AuthContext)

export default useAuth
