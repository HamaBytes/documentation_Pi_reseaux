import { useState } from 'react'
import { routerConfigs } from '../data/configurations'
import CodeBlock from '../components/CodeBlock'
import { Download, Search } from 'lucide-react'
import JSZip from 'jszip'

const Configurations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRouter, setSelectedRouter] = useState(null)

  const routers = Object.keys(routerConfigs)

  const filteredRouters = routers.filter(router =>
    router.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportAllConfigs = async () => {
    const zip = new JSZip()
    
    routers.forEach(router => {
      const config = routerConfigs[router]
      const filename = `${router.replace(/\s+/g, '-')}.txt`
      zip.file(filename, config)
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'techsolutions-router-configs.zip'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportSingleConfig = (router) => {
    const config = routerConfigs[router]
    const blob = new Blob([config], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${router.replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Configurations Routeurs</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configurations complètes de tous les routeurs du réseau
          </p>
        </div>
        <button
          onClick={exportAllConfigs}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Exporter tout (ZIP)</span>
        </button>
      </div>

      {/* Search and Router List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un routeur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredRouters.map((router) => (
            <button
              key={router}
              onClick={() => setSelectedRouter(router)}
              className={`
                p-4 rounded-lg border-2 transition-all text-left
                ${selectedRouter === router
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                }
              `}
            >
              <div className="font-semibold text-gray-900 dark:text-white">{router}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {router.includes('Backbone') ? 'Routeur Backbone' : 'Routeur Départemental'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Display */}
      {selectedRouter && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Configuration: {selectedRouter}
            </h2>
            <button
              onClick={() => exportSingleConfig(selectedRouter)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger</span>
            </button>
          </div>
          <CodeBlock
            code={routerConfigs[selectedRouter]}
            language="text"
            filename={`${selectedRouter}.txt`}
          />
        </div>
      )}

      {/* Router Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routers.map((router) => (
          <div
            key={router}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{router}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {router.includes('Backbone') && (
                <>
                  <div>• Configuration OSPF Area 0</div>
                  <div>• Interfaces Serial (Backbone)</div>
                  <div>• NAT Overload configuré</div>
                  <div>• Routes statiques</div>
                </>
              )}
              {router.includes('RZ') && (
                <>
                  <div>• Interface publique vers Backbone</div>
                  <div>• Interface LAN département</div>
                  <div>• Pool DHCP configuré</div>
                  <div>• Route par défaut</div>
                </>
              )}
              {router === 'R-Internet' && (
                <>
                  <div>• Interface WAN (Internet)</div>
                  <div>• NAT dynamique et statique</div>
                  <div>• Redirections ports serveurs</div>
                  <div>• Default route vers Internet</div>
                </>
              )}
            </div>
            <button
              onClick={() => setSelectedRouter(router)}
              className="mt-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
            >
              Voir configuration →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Configurations

