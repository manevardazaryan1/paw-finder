import AppRoutes from './routes/Routes'
import { useAddReport } from './hooks/useAddReport'

const App = () => {
  useAddReport()
  return <AppRoutes />
}

export default App
