import { useState } from 'react'
import { Server, Monitor, Network, CheckCircle } from 'lucide-react'
import { departmentsPCs, serverCommands, pcCommands, routerVerificationCommands } from '../data/pcConfigurations'
import CodeBlock from '../components/CodeBlock'
import SortableTable from '../components/SortableTable'

const getNetworkBase = (network) => {
  if (!network) return ''
  const [address] = network.split('/')
  const octets = address.split('.')
  if (octets.length >= 3) {
    return `${octets[0]}.${octets[1]}.${octets[2]}`
  }
  return address
}

const PCsAndServers = () => {
  const [selectedDept, setSelectedDept] = useState(null)
  const [activeTab, setActiveTab] = useState('server') // server, pc, router

  const summaryTable = departmentsPCs.flatMap(dept => [
    {
      type: 'Serveur',
      name: dept.server.name,
      department: dept.name,
      ip: dept.server.ip,
      mask: dept.server.mask,
      gateway: dept.server.gateway,
      dns: dept.server.dns
    },
    ...dept.pcs.map(pc => ({
      type: 'PC',
      name: pc.name,
      department: dept.name,
      ip: pc.expectedIP,
      mask: '-',
      gateway: pc.gateway,
      dns: pc.dns
    }))
  ])

  const summaryColumns = [
    { key: 'type', label: 'Type', sortable: true },
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'department', label: 'Département', sortable: true },
    { key: 'ip', label: 'IP', sortable: true },
    { key: 'mask', label: 'Masque', sortable: true },
    { key: 'gateway', label: 'Gateway', sortable: true },
    { key: 'dns', label: 'DNS', sortable: true }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Monitor className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
          Configuration PCs et Serveurs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configurations complètes des serveurs et PCs par département avec toutes les commandes de test
        </p>
      </div>

      {/* Summary Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Tableau Récapitulatif des Adresses
        </h2>
        <SortableTable data={summaryTable} columns={summaryColumns} />
      </div>

      {/* Department Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Sélectionner un Département
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentsPCs.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedDept?.id === dept.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              <div className="font-semibold text-gray-900 dark:text-white">{dept.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{dept.router}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-mono">
                {dept.network}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Department Details */}
      {selectedDept && (
        <div className="space-y-6">
          {/* Department Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Département {selectedDept.name} ({selectedDept.router})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Réseau LAN</div>
                <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.network}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Gateway</div>
                <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.gateway}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Pool DHCP</div>
                <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.dhcpPool}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">DNS</div>
                <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.dns}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1 p-4">
                <button
                  onClick={() => setActiveTab('server')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'server'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Server className="w-5 h-5" />
                  <span>Serveur</span>
                </button>
                <button
                  onClick={() => setActiveTab('pc')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'pc'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                  <span>PCs</span>
                </button>
                <button
                  onClick={() => setActiveTab('router')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === 'router'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Network className="w-5 h-5" />
                  <span>Routeur {selectedDept.router}</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Server Tab */}
              {activeTab === 'server' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Server className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                      {selectedDept.server.name} (IP Statique)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Adresse IP</div>
                        <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.server.ip}</div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Masque</div>
                        <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.server.mask}</div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Gateway</div>
                        <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.server.gateway}</div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">DNS</div>
                        <div className="text-lg font-mono text-gray-900 dark:text-white">{selectedDept.server.dns}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration IP Statique</h4>
                        <CodeBlock
                          code={serverCommands[selectedDept.name]?.config || ''}
                          language="text"
                          filename={`${selectedDept.server.name}.txt`}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tests de Connectivité</h4>
                        <CodeBlock
                          code={serverCommands[selectedDept.name]?.tests || ''}
                          language="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PCs Tab */}
              {activeTab === 'pc' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Monitor className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                      PCs du Département (DHCP)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {selectedDept.pcs.map((pc, idx) => (
                        <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="font-semibold text-gray-900 dark:text-white mb-2">{pc.name}</div>
                          <div className="text-sm space-y-1">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">IP attendue: </span>
                              <span className="font-mono text-gray-900 dark:text-white">{pc.expectedIP}</span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Gateway: </span>
                              <span className="font-mono text-gray-900 dark:text-white">{pc.gateway}</span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">DNS: </span>
                              <span className="font-mono text-gray-900 dark:text-white">{pc.dns}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration de Base (DHCP)</h4>
                        <CodeBlock
                          code={pcCommands.basic.replace('192.168.X', getNetworkBase(selectedDept.network))}
                          language="text"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tests Inter-Départements</h4>
                        <CodeBlock
                          code={pcCommands.interDepartment}
                          language="text"
                        />
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Résultat Attendu pour {selectedDept.pcs[0]?.name}
                        </h4>
                        <div className="text-sm text-blue-800 dark:text-blue-200 font-mono space-y-1">
                          <div>NAME: {selectedDept.pcs[0]?.name}</div>
                          <div>IP/MASK: {selectedDept.pcs[0]?.expectedIP}</div>
                          <div>GATEWAY: {selectedDept.pcs[0]?.gateway}</div>
                          <div>DNS: {selectedDept.pcs[0]?.dns}</div>
                          <div>DHCP SERVER: {selectedDept.gateway}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Router Tab */}
              {activeTab === 'router' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Network className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                      Vérifications sur {selectedDept.router}
                    </h3>
                    <CodeBlock
                      code={routerVerificationCommands[selectedDept.router] || ''}
                      language="text"
                      filename={`${selectedDept.router}-verification.txt`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PCsAndServers

