import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Architecture from './pages/Architecture'
import VLSM from './pages/VLSM'
import Configurations from './pages/Configurations'
import Protocols from './pages/Protocols'
import Tests from './pages/Tests'
import Checklist from './pages/Checklist'
import CommandReference from './pages/CommandReference'

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

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/vlsm" element={<VLSM />} />
          <Route path="/configurations" element={<Configurations />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/commands" element={<CommandReference />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

