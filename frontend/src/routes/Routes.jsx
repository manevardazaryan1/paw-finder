import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import Main from '../pages/main/Main'
import Reports from '../pages/report/Reports'
import CreateReport from '../pages/report/createReport'
import UpdateReport from '../pages/report/UpdateReport'
import ProtectedRoute from './ProtectedRoute'
import GuestRoute from './GuestRoute'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<GuestRoute />}>
            <Route index element={<Main />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="reports" element={<Reports />} />
            <Route path="create-report" element={<CreateReport />} />
            <Route path="update-report" element={<UpdateReport />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
