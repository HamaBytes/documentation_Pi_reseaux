import { Link } from 'react-router-dom'
import { Network, Calculator, Settings, BookOpen, TestTube, CheckSquare, Terminal, Monitor, ArrowRight } from 'lucide-react'
import { departments, totalEmployees } from '../data/networkData'

const Home = () => {
  const features = [
    { icon: Network, title: 'Architecture Réseau', description: 'Topologie complète avec diagrammes interactifs', path: '/architecture' },
    { icon: Calculator, title: 'VLSM Calculator', description: 'Calculs détaillés du plan d\'adressage', path: '/vlsm' },
    { icon: Settings, title: 'Configurations', description: 'Configurations complètes de tous les routeurs', path: '/configurations' },
    { icon: BookOpen, title: 'Protocoles', description: 'OSPF, DHCP, NAT et routage statique', path: '/protocols' },
    { icon: TestTube, title: 'Tests & Validation', description: 'Procédures de test et validation', path: '/tests' },
    { icon: CheckSquare, title: 'Checklist', description: '60 items de validation avec suivi', path: '/checklist' },
    { icon: Terminal, title: 'Référence Commandes', description: 'Toutes les commandes Cisco documentées', path: '/commands' },
    { icon: Monitor, title: 'PCs & Serveurs', description: 'Configurations complètes des PCs et serveurs', path: '/pcs-servers' }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">TechSolutions SARL</h1>
        <p className="text-xl mb-2">Documentation Réseau Infrastructure</p>
        <p className="text-primary-100">
          Infrastructure réseau d'entreprise avec OSPF backbone maillé, VLSM, et 9,669 employés répartis sur 4 départements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{totalEmployees.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Employés</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">4</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Départements</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">9</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Routeurs</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">60</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Items Checklist</div>
        </div>
      </div>

      {/* Departments Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Départements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{dept.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{dept.router}</p>
              <p className="text-sm text-primary-600 dark:text-primary-400 mt-2">
                {dept.employees.toLocaleString()} employés
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{dept.network}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Link
                key={idx}
                to={feature.path}
                className="group p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-primary-600 dark:text-primary-400 mt-2 text-sm font-medium">
                      Accéder <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vue d'Ensemble du Projet</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Objectifs</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Disponibilité : Garantir la disponibilité des services critiques</li>
              <li>Sécurité : Assurer la sécurité du réseau et hiérarchisation des flux</li>
              <li>Supervision : Mise en place d'une supervision proactive</li>
              <li>Évolutivité : Architecture évolutive conforme aux standards</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contraintes Techniques</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bloc d'adressage : 192.168.0.0/17 (32,768 adresses)</li>
              <li>Réseau public Backbone : 41.16.0.0/16</li>
              <li>Réseau WAN Internet : 203.0.113.0/24 (simulé)</li>
              <li>Protocoles obligatoires : OSPF, DHCP, NAT</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

