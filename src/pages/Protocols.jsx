import { BookOpen, Network, Server, Shield } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import { departments } from '../data/networkData'

const Protocols = () => {
  const ospfConfig = `router ospf 1
 router-id X.X.X.X
 log-adjacency-changes
 passive-interface FastEthernet0/0
 network 41.16.1.X 0.0.0.3 area 0
 default-information originate`

  const dhcpConfig = `ip dhcp excluded-address 192.168.0.1 192.168.0.50
ip dhcp excluded-address 192.168.31.250 192.168.31.255

ip dhcp pool WEB-MARKETING
 network 192.168.0.0 255.255.224.0
 default-router 192.168.0.1
 dns-server 8.8.8.8 8.8.4.4
 domain-name web.techsolutions.local
 lease 7`

  const natConfig = `! Définir inside et outside
interface FastEthernet0/0
 ip nat inside

interface Serial1/3
 ip nat outside

! ACL pour le trafic à NATer
access-list 10 permit 192.168.0.0 0.0.31.255

! NAT Overload (PAT)
ip nat inside source list 10 interface Serial1/3 overload`

  const staticRouteConfig = `! Sur les routeurs Backbone
ip route 0.0.0.0 0.0.0.0 41.16.1.25  ! Vers R-Internet

! Sur les routeurs Départementaux
ip route 0.0.0.0 0.0.0.0 41.16.2.1   ! Vers Backbone

! Sur R-Internet
ip route 192.168.0.0 255.255.224.0 41.16.1.26     ! Vers Web/Marketing
ip route 192.168.32.0 255.255.248.0 41.16.1.34    ! Vers Base de données
ip route 192.168.40.0 255.255.252.0 41.16.1.30    ! Vers IT
ip route 192.168.46.0 255.255.255.128 41.16.1.38  ! Vers Collaboration`

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
          Protocoles et Services
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Documentation complète des protocoles implémentés : OSPF, DHCP, NAT et routage statique
        </p>
      </div>

      {/* OSPF */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Network className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">OSPF (Open Shortest Path First)</h2>
        </div>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Caractéristiques</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Version : OSPFv2</li>
              <li>Area : Area 0 (Backbone Area)</li>
              <li>Type : Link-State Protocol</li>
              <li>Métrique : Cost (basé sur la bande passante)</li>
              <li>Convergence : Rapide (&lt;5 secondes)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration</h3>
            <CodeBlock code={ospfConfig} language="text" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vérifications</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-600 dark:text-gray-400 mb-2">Commandes de vérification :</div>
              <div>show ip ospf neighbor</div>
              <div>show ip ospf interface</div>
              <div>show ip ospf database</div>
              <div>show ip route ospf</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Topologie Maillée</h3>
            <p className="mb-2">
              Le backbone OSPF est entièrement maillé avec 5 routeurs interconnectés :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>R1 ↔ R2, R3, R4</li>
              <li>R2 ↔ R3, R4</li>
              <li>R3 ↔ R4</li>
              <li>R-Internet ↔ R1, R2, R3, R4</li>
            </ul>
            <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
              ✅ Avantages : Redondance totale, pas de SPOF, convergence rapide, répartition de charge
            </p>
          </div>
        </div>
      </div>

      {/* DHCP */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Server className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">DHCP (Dynamic Host Configuration Protocol)</h2>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Caractéristiques</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Serveur : Sur chaque routeur RZ</li>
              <li>Lease : 7 jours</li>
              <li>DNS : 8.8.8.8, 8.8.4.4</li>
              <li>Gateway : Interface LAN du routeur RZ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration Exemple</h3>
            <CodeBlock code={dhcpConfig} language="text" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Pools DHCP par Département</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Département</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Pool Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Réseau</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Gateway</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Plage DHCP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">DNS</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {departments.map((dept) => (
                    <tr key={dept.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{dept.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">{dept.dhcpPool}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">{dept.network}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">{dept.gateway}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                        {dept.network.includes('/19') ? '.51 - .31.249' :
                         dept.network.includes('/22') ? '.51 - .43.249' :
                         dept.network.includes('/21') ? '.51 - .39.249' : '.31 - .119'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">8.8.8.8</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vérifications</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
              <div>show ip dhcp pool</div>
              <div>show ip dhcp binding</div>
              <div>show ip dhcp server statistics</div>
              <div>show ip dhcp conflict</div>
            </div>
          </div>
        </div>
      </div>

      {/* NAT */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NAT (Network Address Translation)</h2>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Architecture NAT Double</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm mb-2">
              <div>PC (192.168.0.51) → RZ1 → R1-Backbone (NAT1) → R-Internet (NAT2) → Internet</div>
              <div className="text-gray-600 dark:text-gray-400 mt-1">
                Privé → 41.16.1.26 → 203.0.113.1 → Public
              </div>
            </div>
            <p className="text-sm">
              NAT1 sur Backbone : Masquer IPs privées départements<br />
              NAT2 sur R-Internet : Accès Internet<br />
              Sécurité renforcée et gestion centralisée des accès
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration NAT sur Routeurs Backbone</h3>
            <CodeBlock code={natConfig} language="text" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">NAT Statique pour Serveurs (sur R-Internet)</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
              <div>ip nat inside source static tcp 192.168.0.20 80 203.0.113.20 80</div>
              <div>ip nat inside source static tcp 192.168.0.20 443 203.0.113.20 443</div>
              <div>ip nat inside source static 192.168.40.20 203.0.113.40</div>
              <div>ip nat inside source static tcp 192.168.32.20 3306 203.0.113.32 3306</div>
              <div>ip nat inside source static 192.168.46.20 203.0.113.46</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vérifications</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
              <div>show ip nat statistics</div>
              <div>show ip nat translations</div>
              <div>clear ip nat translation *</div>
            </div>
          </div>
        </div>
      </div>

      {/* Static Routing */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Network className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Routage Statique</h2>
        </div>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration</h3>
            <CodeBlock code={staticRouteConfig} language="text" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Routes par Défaut</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Sur les routeurs Backbone : Vers R-Internet (41.16.1.25)</li>
              <li>Sur les routeurs Départementaux : Vers Backbone correspondant</li>
              <li>Sur R-Internet : Vers Gateway Internet (203.0.113.254)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Routes Spécifiques</h3>
            <p className="mb-2">Sur R-Internet, routes statiques vers chaque département :</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>192.168.0.0/19 → 41.16.1.26 (Web/Marketing)</li>
              <li>192.168.32.0/21 → 41.16.1.34 (Base de données)</li>
              <li>192.168.40.0/22 → 41.16.1.30 (IT)</li>
              <li>192.168.46.0/25 → 41.16.1.38 (Collaboration)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Protocols

