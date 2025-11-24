import { useState, useEffect } from 'react'
import { checklistItems } from '../data/checklist'
import { CheckSquare, Square, Download, FileText } from 'lucide-react'
import jsPDF from 'jspdf'

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('checklistItems')
    return saved ? JSON.parse(saved) : {}
  })

  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('checklistItems', JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const checkedCount = Object.values(checkedItems).filter(Boolean).length
  const totalItems = checklistItems.length
  const progress = Math.round((checkedCount / totalItems) * 100)

  const categories = [...new Set(checklistItems.map(item => item.category))]

  const filteredItems = filter === 'all' 
    ? checklistItems 
    : checklistItems.filter(item => item.category === filter)

  const exportPDF = () => {
    const doc = new jsPDF()
    let y = 20

    doc.setFontSize(18)
    doc.text('Checklist Validation Semaine 11', 14, y)
    y += 10

    doc.setFontSize(12)
    doc.text(`Progression: ${checkedCount}/${totalItems} (${progress}%)`, 14, y)
    y += 15

    categories.forEach(category => {
      const categoryItems = checklistItems.filter(item => item.category === category)
      const categoryChecked = categoryItems.filter(item => checkedItems[item.id]).length

      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text(`${category} (${categoryChecked}/${categoryItems.length})`, 14, y)
      y += 8

      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      
      categoryItems.forEach(item => {
        if (y > 280) {
          doc.addPage()
          y = 20
        }
        const check = checkedItems[item.id] ? '✓' : '☐'
        doc.text(`${check} ${item.item}`, 20, y)
        y += 6
      })
      y += 5
    })

    doc.save('techsolutions-checklist.pdf')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <CheckSquare className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" />
            Checklist Validation (60 items)
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Suivi de progression pour la validation Semaine 11
          </p>
        </div>
        <button
          onClick={exportPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Exporter PDF</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {checkedCount} / {totalItems}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Items complétés</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {progress}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Progression</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-primary-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Note minimale pour validation : 48/60 (80%)
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Tous ({totalItems})
          </button>
          {categories.map(category => {
            const count = checklistItems.filter(item => item.category === category).length
            const checked = checklistItems.filter(item => item.category === category && checkedItems[item.id]).length
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category} ({checked}/{count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {categories
          .filter(cat => filter === 'all' || cat === filter)
          .map(category => {
            const categoryItems = checklistItems.filter(item => item.category === category)
            const categoryChecked = categoryItems.filter(item => checkedItems[item.id]).length
            
            return (
              <div
                key={category}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category}
                  </h2>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {categoryChecked} / {categoryItems.length} complétés
                  </div>
                </div>
                <div className="space-y-3">
                  {categoryItems.map(item => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        checkedItems[item.id]
                          ? 'border-green-500 bg-green-50 dark:bg-green-900'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="mt-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {checkedItems[item.id] ? (
                            <CheckSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                          ) : (
                            <Square className="w-6 h-6" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {item.item}
                            </h3>
                            {item.router && (
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                {item.router}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {item.description}
                          </p>
                          {item.command && (
                            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded font-mono text-xs text-gray-700 dark:text-gray-300">
                              {item.command}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>

      {/* Score Summary */}
      <div className="bg-primary-50 dark:bg-primary-900 rounded-lg border border-primary-200 dark:border-primary-800 p-6">
        <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4">
          Score de Validation 1
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-primary-700 dark:text-primary-300">Schéma et Documentation</div>
            <div className="text-2xl font-bold text-primary-900 dark:text-primary-100">
              {Math.round((checkedItems[1] ? 1 : 0) + (checkedItems[2] ? 1 : 0) + (checkedItems[3] ? 1 : 0) + (checkedItems[4] ? 1 : 0) + (checkedItems[5] ? 1 : 0) + (checkedItems[6] ? 1 : 0))} / 10
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-primary-700 dark:text-primary-300">Configuration OSPF</div>
            <div className="text-2xl font-bold text-primary-900 dark:text-primary-100">
              {Math.round((checkedItems[7] ? 1 : 0) + (checkedItems[8] ? 1 : 0) + (checkedItems[9] ? 1 : 0) + (checkedItems[10] ? 1 : 0) + (checkedItems[11] ? 1 : 0) + (checkedItems[12] ? 1 : 0))} / 15
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-primary-700 dark:text-primary-300">Configuration Départements</div>
            <div className="text-2xl font-bold text-primary-900 dark:text-primary-100">
              {Math.round((checkedItems[13] ? 1 : 0) + (checkedItems[14] ? 1 : 0) + (checkedItems[15] ? 1 : 0) + (checkedItems[16] ? 1 : 0) + (checkedItems[17] ? 1 : 0) + (checkedItems[18] ? 1 : 0))} / 10
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-900 dark:text-primary-100 mb-2">
            {checkedCount} / {totalItems}
          </div>
          <div className="text-sm text-primary-700 dark:text-primary-300">
            {checkedCount >= 48 ? '✅ Validation réussie !' : '⚠️ Minimum 48/60 requis pour validation'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checklist

