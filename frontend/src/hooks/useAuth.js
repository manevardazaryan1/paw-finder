import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../redux/slices/auth/signIn'
import { selectToken, selectUser } from '../redux/slices/auth/signIn'

export const useAuth = () => {
  const dispatch = useDispatch()

  const token = useSelector(selectToken)
  const user = useSelector(selectUser)

  const handleSignOut = () => {
    dispatch(signOut())
  }

  return {
    isAuth: !!token,
    user,
    handleSignOut
  }
}
