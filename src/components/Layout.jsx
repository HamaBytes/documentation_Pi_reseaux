import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Network, 
  Calculator, 
  Settings, 
  BookOpen, 
  TestTube, 
  Terminal,
  Monitor,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react'

const Layout = ({ children, darkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/architecture', icon: Network, label: 'Architecture' },
    { path: '/vlsm', icon: Calculator, label: 'VLSM Calculator' },
    { path: '/configurations', icon: Settings, label: 'Configurations' },
    { path: '/protocols', icon: BookOpen, label: 'Protocoles' },
    { path: '/tests', icon: TestTube, label: 'Tests & Validation' },
    { path: '/commands', icon: Terminal, label: 'Référence Commandes' },
    { path: '/pcs-servers', icon: Monitor, label: 'PCs & Serveurs' }
  ]

  const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

  const normalizePath = (pathname) => {
    if (!basePath) return pathname || '/'
    if (!pathname.startsWith(basePath)) return pathname || '/'
    const trimmed = pathname.slice(basePath.length)
    return trimmed === '' ? '/' : trimmed
  }

  const isActive = (path) => normalizePath(location.pathname) === path

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Network className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                TechSolutions
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive(item.path)
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer with theme toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Mode clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Mode sombre</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Documentation Réseau Infrastructure
              </h2>
            </div>
            <div className="w-6" /> {/* Spacer for mobile */}
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

