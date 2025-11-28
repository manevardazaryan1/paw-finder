import { useState, useEffect } from 'react'

const useApp = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return {
    isLoading
  }
}

export default useApp
