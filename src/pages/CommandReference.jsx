import { useState } from 'react'
import { Terminal, Search } from 'lucide-react'
import { ciscoCommands } from '../data/configurations'
import CodeBlock from '../components/CodeBlock'

const CommandReference = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [...new Set(ciscoCommands.map(cmd => cmd.category))]

  const filteredCommands = ciscoCommands.filter(cmd => {
    const matchesSearch = cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Terminal className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
          Référence Commandes Cisco
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Documentation complète de toutes les commandes Cisco utilisées dans le projet
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Toutes ({ciscoCommands.length})
          </button>
          {categories.map(category => {
            const count = ciscoCommands.filter(cmd => cmd.category === category).length
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Commands by Category */}
      <div className="space-y-6">
        {categories
          .filter(cat => selectedCategory === 'all' || cat === selectedCategory)
          .map(category => {
            const categoryCommands = filteredCommands.filter(cmd => cmd.category === category)
            if (categoryCommands.length === 0) return null

            return (
              <div
                key={category}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {category} ({categoryCommands.length})
                </h2>
                <div className="space-y-4">
                  {categoryCommands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <code className="text-lg font-mono text-primary-600 dark:text-primary-400 font-bold">
                          {cmd.command}
                        </code>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {cmd.description}
                      </p>
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm">
                        <div className="text-gray-600 dark:text-gray-400 mb-1">Exemple d'utilisation :</div>
                        <div className="text-gray-900 dark:text-white">{cmd.command}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>

      {/* Quick Reference Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Référence Rapide</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCommands.map((cmd, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {cmd.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-600 dark:text-primary-400">
                    {cmd.command}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {cmd.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Command Sequences */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Séquences de Commandes Courantes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vérification Complète d'un Routeur</h3>
            <CodeBlock
              code={`show ip interface brief
show ip route
show ip ospf neighbor
show ip ospf interface
show ip nat statistics
show ip nat translations
ping 8.8.8.8`}
              language="text"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vérification DHCP</h3>
            <CodeBlock
              code={`show ip dhcp pool
show ip dhcp binding
show ip dhcp server statistics
show ip dhcp conflict`}
              language="text"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Dépannage OSPF</h3>
            <CodeBlock
              code={`show ip ospf neighbor
show ip ospf interface
show ip ospf database
show ip route ospf
debug ip ospf events
undebug all`}
              language="text"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandReference

