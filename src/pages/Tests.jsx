import React, { useState } from 'react'
import { TestTube, CheckCircle, XCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import TestForm from '../components/TestForm'
import TestList from '../components/TestList'
import TestDetail from '../components/TestDetail'

const Tests = () => { const [selected, setSelected] = useState(null)
  const r1Tests = `enable

! Vérifier les interfaces
show ip interface brief

! Vérifier les voisins OSPF (doit voir 4 voisins)
show ip ospf neighbor

! Résultat attendu :
! Neighbor ID     Pri   State           Dead Time   Address         Interface
! 2.2.2.2           0   FULL/  -        00:00:39    41.16.1.2       Serial1/0
! 3.3.3.3           0   FULL/  -        00:00:38    41.16.1.6       Serial1/1
! 4.4.4.4           0   FULL/  -        00:00:37    41.16.1.10      Serial1/2
! 5.5.5.5           0   FULL/  -        00:00:39    41.16.1.25      Serial1/3

! Vérifier la table de routage OSPF
show ip route ospf

! Vérifier NAT
show ip nat statistics
show ip nat translations

! Tests de connectivité
ping 41.16.1.2      ! R2-Backbone
ping 41.16.1.6      ! R3-Backbone
ping 41.16.1.10     ! R4-Backbone
ping 41.16.1.25     ! R-Internet
ping 41.16.2.2      ! RZ1
ping 192.168.0.1    ! Gateway RZ1
ping 8.8.8.8        ! Internet

! Traceroute
traceroute 8.8.8.8`

  const rz1Tests = `enable

! Vérifier les interfaces
show ip interface brief

! Résultat attendu :
! Interface          IP-Address      OK? Method Status                Protocol
! FastEthernet0/0    41.16.2.2       YES manual up                    up
! FastEthernet0/1    192.168.0.1     YES manual up                    up

! Vérifier la table de routage
show ip route

! Vérifier DHCP
show ip dhcp pool
show ip dhcp binding
show ip dhcp server statistics

! Tests de connectivité
ping 41.16.2.1      ! R1-Backbone
ping 41.16.1.26     ! R1 vers R-Internet
ping 41.16.1.25     ! R-Internet
ping 8.8.8.8        ! Internet

! Traceroute
traceroute 8.8.8.8`

  const pcTests = `# Obtenir IP via DHCP
dhcp

# Vérifier IP reçue
show ip

# Résultat attendu :
# NAME        : PC-Web-1
# IP/MASK     : 192.168.0.51/19
# GATEWAY     : 192.168.0.1
# DNS         : 8.8.8.8
# DHCP SERVER : 192.168.0.1

# Tests de connectivité locale
ping 192.168.0.1        # Gateway RZ1
ping 192.168.0.20       # Serveur Web

# Tests Backbone
ping 41.16.2.2          # RZ1 public
ping 41.16.2.1          # R1-Backbone

# Tests inter-départements
ping 192.168.40.1       # Gateway RZ2 (IT)
ping 192.168.32.1       # Gateway RZ3 (DB)
ping 192.168.46.1       # Gateway RZ4 (Collab)

# Tests Internet
ping 8.8.8.8            # Google DNS
ping 1.1.1.1            # Cloudflare DNS

# Traceroute vers Internet
traceroute 8.8.8.8

# Résultat attendu :
# 1   192.168.0.1        # RZ1
# 2   41.16.2.1          # R1-Backbone
# 3   41.16.1.25         # R-Internet
# 4   203.0.113.254      # Gateway Internet
# 5   8.8.8.8            # Internet

# Sauvegarder
save`

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <TestTube className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
          Tests et Validation
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Procédures de test complètes pour valider la configuration du réseau
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Gestion des Tests</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Créez, joignez des preuves (screenshots) et consultez les tests enregistrés.</p>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2">
            <TestForm onSaved={(t)=>{setSelected(t); window.location.hash = '#detail'}} />
            <div className="mt-6">
              <TestList onSelect={(t)=>{setSelected(t); window.location.hash = '#detail'}} />
            </div>
          </div>

          <div id="detail">
            <TestDetail test={selected} />
          </div>
        </div>
      </div>

      {/* Test Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tests Backbone</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Vérification interfaces OSPF</li>
            <li>• Voisinages OSPF établis</li>
            <li>• Routes OSPF convergées</li>
            <li>• Tests de connectivité</li>
            <li>• Vérification NAT</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tests Départements</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Interfaces UP</li>
            <li>• Configuration DHCP</li>
            <li>• Baux DHCP actifs</li>
            <li>• Routes par défaut</li>
            <li>• Connectivité Backbone</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tests PCs</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Obtention IP DHCP</li>
            <li>• Connectivité locale</li>
            <li>• Connectivité inter-départements</li>
            <li>• Accès Internet</li>
            <li>• Traceroute</li>
          </ul>
        </div>
      </div>

      {/* R1-Backbone Tests */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tests sur Routeurs Backbone</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">R1-Backbone</h3>
          <CodeBlock code={r1Tests} language="text" />
        </div>
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Résultats Attendus</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>4 voisins OSPF en état FULL</li>
            <li>Toutes les interfaces UP/UP</li>
            <li>Routes OSPF présentes dans la table de routage</li>
            <li>Translations NAT actives lors de trafic</li>
            <li>Ping réussis vers tous les routeurs</li>
            <li>Accès Internet fonctionnel</li>
          </ul>
        </div>
      </div>

      {/* RZ-1 Tests */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tests sur Routeurs Départementaux</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">RZ-1</h3>
          <CodeBlock code={rz1Tests} language="text" />
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Résultats Attendus</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>2 interfaces UP/UP (publique et privée)</li>
            <li>Route par défaut configurée vers Backbone</li>
            <li>Pool DHCP actif avec baux</li>
            <li>Connectivité vers Backbone et Internet</li>
            <li>Traceroute montre 3-4 hops vers Internet</li>
          </ul>
        </div>
      </div>

      {/* PC Tests */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tests sur PCs (VPCS)</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">PC-Web-1</h3>
          <CodeBlock code={pcTests} language="bash" />
        </div>
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Résultats Attendus</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 dark:text-purple-200">
            <li>IP obtenue via DHCP dans la plage configurée</li>
            <li>Gateway et DNS correctement configurés</li>
            <li>Ping réussis vers gateway et serveur local</li>
            <li>Connectivité inter-départements fonctionnelle</li>
            <li>Accès Internet (8.8.8.8, 1.1.1.1)</li>
            <li>Traceroute montre le chemin complet (4-5 hops)</li>
          </ul>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dépannage Courant</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Problème : OSPF Neighbor Not Forming</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Causes possibles :</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
              <li>Interfaces down</li>
              <li>Mauvaise zone OSPF</li>
              <li>Différents masques réseau</li>
              <li>Authentication mismatch</li>
              <li>MTU mismatch</li>
            </ul>
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm">
              show ip ospf neighbor<br />
              show ip ospf interface<br />
              show ip interface brief
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Problème : DHCP Clients Not Getting IP</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Causes possibles :</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
              <li>Service DHCP désactivé</li>
              <li>Pool épuisé</li>
              <li>Interface DHCP mal configurée</li>
              <li>Conflits d'adresses</li>
            </ul>
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm">
              service dhcp<br />
              show ip dhcp pool<br />
              show ip dhcp binding<br />
              clear ip dhcp conflict *
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Problème : NAT Not Working</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Causes possibles :</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
              <li>Inside/Outside mal configuré</li>
              <li>ACL incorrecte</li>
              <li>Route manquante</li>
              <li>IP overlap</li>
            </ul>
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm">
              show ip nat statistics<br />
              show ip nat translations<br />
              show access-lists<br />
              clear ip nat translation *
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tests

