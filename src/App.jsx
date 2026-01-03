import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Architecture from './pages/Architecture'
import VLSM from './pages/VLSM'
import Configurations from './pages/Configurations'
import Protocols from './pages/Protocols'
import Tests from './pages/Tests'
import CommandReference from './pages/CommandReference'
import PCsAndServers from './pages/PCsAndServers'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved !== null ? JSON.parse(saved) : true
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Base path pour GitHub Pages (doit correspondre à Vite)
  const basename = import.meta.env.PROD ? '/documentation_Pi_reseaux/' : '/'

  // S'assurer qu'on charge l'accueil par défaut
  useEffect(() => {
    // Si on est sur la racine, s'assurer qu'on affiche l'accueil
    if (window.location.pathname === basename || window.location.pathname === `${basename}/`) {
      // L'accueil est déjà la route par défaut, pas besoin de redirection
    }
  }, [basename])

  return (
    <Router basename={basename}>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/vlsm" element={<VLSM />} />
          <Route path="/configurations" element={<Configurations />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/commands" element={<CommandReference />} />
          <Route path="/pcs-servers" element={<PCsAndServers />} />
          {/* Route catch-all pour rediriger vers l'accueil */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

