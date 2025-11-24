import NetworkDiagram from '../components/NetworkDiagram'
import { departments, backboneLinks, departmentLinks, wanNetwork } from '../data/networkData'
import SortableTable from '../components/SortableTable'

const Architecture = () => {
  const backboneColumns = [
    { key: 'from', label: 'Routeur 1', sortable: true },
    { key: 'to', label: 'Routeur 2', sortable: true },
    { key: 'network', label: 'Sous-réseau', sortable: true },
    { key: 'ip1', label: 'IP 1', sortable: true },
    { key: 'ip2', label: 'IP 2', sortable: true },
    { key: 'broadcast', label: 'Broadcast', sortable: true }
  ]

  const deptColumns = [
    { key: 'backbone', label: 'Backbone', sortable: true },
    { key: 'router', label: 'Routeur Département', sortable: true },
    { key: 'network', label: 'Sous-réseau', sortable: true },
    { key: 'backboneIP', label: 'IP Backbone', sortable: true },
    { key: 'routerIP', label: 'IP RZ', sortable: true },
    { key: 'department', label: 'Département', sortable: true }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Architecture Réseau</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Topologie complète avec backbone OSPF maillé et 4 départements
        </p>
      </div>

      {/* Interactive Diagram */}
      <NetworkDiagram />

      {/* Architecture Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Schéma d'Architecture</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Topologie Backbone OSPF Maillée</h3>
            <p className="mb-2">
              Le backbone est entièrement maillé avec 5 routeurs (R1, R2, R3, R4, R-Internet) 
              interconnectés pour garantir une redondance maximale et éviter tout point de défaillance unique (SPOF).
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Redondance totale (pas de SPOF)</li>
              <li>Convergence OSPF rapide</li>
              <li>Répartition de charge</li>
              <li>Haute disponibilité</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Backbone Links Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Liaisons Backbone OSPF (Area 0)
        </h2>
        <SortableTable data={backboneLinks} columns={backboneColumns} />
      </div>

      {/* Department Links Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Liaisons Backbone → Départements
        </h2>
        <SortableTable data={departmentLinks} columns={deptColumns} />
      </div>

      {/* WAN Network */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Réseau WAN (Internet Simulé)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Réseau</div>
            <div className="text-lg font-mono text-gray-900 dark:text-white">{wanNetwork.network}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">IP R-Internet (WAN)</div>
            <div className="text-lg font-mono text-gray-900 dark:text-white">{wanNetwork.routerIP}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Gateway Internet</div>
            <div className="text-lg font-mono text-gray-900 dark:text-white">{wanNetwork.gateway}</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Plage Utilisable</div>
            <div className="text-lg font-mono text-gray-900 dark:text-white">{wanNetwork.usableRange}</div>
          </div>
        </div>
      </div>

      {/* Departments Detail */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Topologie par Département</h2>
        <div className="space-y-6">
          {departments.map((dept) => (
            <div key={dept.id} className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {dept.name} ({dept.router})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Réseau LAN</div>
                  <div className="font-mono text-gray-900 dark:text-white">{dept.network}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Gateway</div>
                  <div className="font-mono text-gray-900 dark:text-white">{dept.gateway}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Employés</div>
                  <div className="font-mono text-gray-900 dark:text-white">{dept.employees.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Hôtes Disponibles</div>
                  <div className="font-mono text-gray-900 dark:text-white">{dept.hosts.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Architecture

