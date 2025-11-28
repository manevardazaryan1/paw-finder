import { useState } from 'react'

const useLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return {
    menuOpen,
    toggleMenu
  }
}

export default useLayout
