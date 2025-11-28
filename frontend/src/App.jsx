import AppRoutes from './routes/Routes'
import { useAddReport } from './hooks/useAddReport'
import useApp from './hooks/useApp'

const App = () => {
  const { isLoading } = useApp()

  useAddReport()
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center z-50">
          <div className="text-2xl font-bold mb-4">Loading...</div>
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <AppRoutes />
    </>
  )
}

export default App
