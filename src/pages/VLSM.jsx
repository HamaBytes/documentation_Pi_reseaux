import { vlsmAllocation, addressBlocks } from '../data/networkData'
import SortableTable from '../components/SortableTable'
import { Calculator } from 'lucide-react'

const VLSM = () => {
  const columns = [
    { key: 'order', label: '#', sortable: true },
    { key: 'department', label: 'Département', sortable: true },
    { key: 'employees', label: 'Employés', sortable: true },
    { key: 'cidr', label: 'CIDR', sortable: true },
    { key: 'mask', label: 'Masque', sortable: true },
    { key: 'network', label: 'Réseau', sortable: true },
    { key: 'firstIP', label: 'Première IP', sortable: true },
    { key: 'lastIP', label: 'Dernière IP', sortable: true },
    { key: 'gateway', label: 'Gateway', sortable: true },
    { key: 'hosts', label: 'Hôtes Disponibles', sortable: true }
  ]

  const calculateHosts = (cidr) => {
    const bits = parseInt(cidr.replace('/', ''))
    return Math.pow(2, 32 - bits) - 2
  }

  const calculateMask = (cidr) => {
    const bits = parseInt(cidr.replace('/', ''))
    const mask = []
    for (let i = 0; i < 4; i++) {
      if (bits >= (i + 1) * 8) {
        mask.push(255)
      } else if (bits > i * 8) {
        const remaining = bits - i * 8
        mask.push(256 - Math.pow(2, 8 - remaining))
      } else {
        mask.push(0)
      }
    }
    return mask.join('.')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Calculator className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
          Plan d'Adressage VLSM
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculs détaillés du plan d'adressage avec VLSM pour optimiser l'utilisation des adresses IP
        </p>
      </div>

      {/* VLSM Principle */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Principe du VLSM</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            VLSM (Variable Length Subnet Mask) permet de diviser un réseau en sous-réseaux de tailles différentes 
            pour optimiser l'utilisation des adresses IP.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Formule de Calcul</h3>
            <div className="font-mono text-lg mb-2">
              Nombre d'hôtes = 2<sup>n</sup> - 2
            </div>
            <p className="text-sm">où n = nombre de bits d'hôtes</p>
            <div className="font-mono text-lg mt-4">
              Masque CIDR = 32 - n
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Exemples</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>7170 hôtes → 2<sup>13</sup> = 8192 - 2 = 8190 hôtes → /19</li>
              <li>1790 hôtes → 2<sup>11</sup> = 2048 - 2 = 2046 hôtes → /21</li>
              <li>597 hôtes → 2<sup>10</sup> = 1024 - 2 = 1022 hôtes → /22</li>
              <li>112 hôtes → 2<sup>7</sup> = 128 - 2 = 126 hôtes → /25</li>
              <li>Liaison P2P → 2<sup>2</sup> = 4 - 2 = 2 hôtes → /30</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Address Blocks */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blocs d'Adressage Alloués</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Réseau Privé</div>
            <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">{addressBlocks.private}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">32,768 adresses</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Réseau Public Backbone</div>
            <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">{addressBlocks.publicBackbone}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">65,536 adresses</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Réseau WAN Internet</div>
            <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">{addressBlocks.wan}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">256 adresses</div>
          </div>
        </div>
      </div>

      {/* VLSM Allocation Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Allocation VLSM Départements (Privé)
        </h2>
        <SortableTable data={vlsmAllocation} columns={columns} />
      </div>

      {/* Detailed Calculations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Calculs Détaillés VLSM</h2>
        <div className="space-y-6">
          {vlsmAllocation.map((dept) => (
            <div key={dept.order} className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Département {dept.department} ({dept.employees} PCs)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Hôtes nécessaires</div>
                  <div className="font-mono text-gray-900 dark:text-white">
                    {dept.employees} + serveur + gateway + équipements = ~{dept.employees + 2}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Prochain masque</div>
                  <div className="font-mono text-gray-900 dark:text-white">
                    2<sup>{32 - parseInt(dept.cidr.replace('/', ''))}</sup> - 2 = {dept.hosts} hôtes
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">CIDR</div>
                  <div className="font-mono text-gray-900 dark:text-white">{dept.cidr}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Masque</div>
                  <div className="font-mono text-gray-900 dark:text-white">{dept.mask}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Réseau</div>
                  <div className="font-mono text-gray-900 dark:text-white">{dept.network}</div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Plage totale</div>
                  <div className="font-mono text-gray-900 dark:text-white">
                    {dept.firstIP} - {dept.lastIP}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-primary-50 dark:bg-primary-900 rounded-lg border border-primary-200 dark:border-primary-800 p-6">
        <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">Résumé</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary-800 dark:text-primary-200">
          <div>
            <div className="text-sm opacity-75">Total utilisé</div>
            <div className="text-xl font-bold">
              {vlsmAllocation.reduce((sum, dept) => sum + dept.hosts, 0).toLocaleString()} adresses
            </div>
          </div>
          <div>
            <div className="text-sm opacity-75">Espace libre</div>
            <div className="text-xl font-bold">192.168.47.0 → 192.168.127.255</div>
            <div className="text-sm opacity-75 mt-1">21,384 adresses disponibles pour extension</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VLSM

