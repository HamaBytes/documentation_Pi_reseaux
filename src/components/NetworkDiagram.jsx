import { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

const NetworkDiagram = () => {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [draggedNode, setDraggedNode] = useState(null)
  const [nodePositions, setNodePositions] = useState({
    'R-internet': { x: 400, y: 100 },
    'R1-b': { x: 200, y: 250 },
    'R2-b': { x: 200, y: 450 },
    'R3-b': { x: 600, y: 450 },
    'R4-b': { x: 600, y: 250 },
    'NAT1': { x: 400, y: 30 },
    'Cloud1': { x: 50, y: 250 },
    'Cloud2': { x: 50, y: 450 },
    'Cloud3': { x: 750, y: 250 },
    'RZ-1': { x: 100, y: 600 },
    'RZ-2': { x: 300, y: 600 },
    'RZ-3': { x: 500, y: 600 },
    'RZ-4': { x: 700, y: 600 }
  })

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 2))
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setNodePositions({
      'R-internet': { x: 400, y: 100 },
      'R1-b': { x: 200, y: 250 },
      'R2-b': { x: 200, y: 450 },
      'R3-b': { x: 600, y: 450 },
      'R4-b': { x: 600, y: 250 },
      'NAT1': { x: 400, y: 30 },
      'Cloud1': { x: 50, y: 250 },
      'Cloud2': { x: 50, y: 450 },
      'Cloud3': { x: 750, y: 250 },
      'RZ-1': { x: 100, y: 600 },
      'RZ-2': { x: 300, y: 600 },
      'RZ-3': { x: 500, y: 600 },
      'RZ-4': { x: 700, y: 600 }
    })
  }

  const handleMouseDown = (e) => {
    // Vérifier si on clique sur un nœud (circle ou ellipse)
    const nodeName = e.target.getAttribute('data-node')
    if (nodeName && (e.target.tagName === 'circle' || e.target.tagName === 'ellipse')) {
      setDraggedNode(nodeName)
      const rect = e.currentTarget.getBoundingClientRect()
      const svgPoint = {
        x: (e.clientX - rect.left - pan.x) / zoom,
        y: (e.clientY - rect.top - pan.y) / zoom
      }
      setDragStart(svgPoint)
      setIsDragging(true)
      e.stopPropagation()
      return
    }
    // Pan du canvas si on ne clique pas sur un nœud
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e) => {
    if (draggedNode && isDragging) {
      const rect = e.currentTarget.getBoundingClientRect()
      const svgPoint = {
        x: (e.clientX - rect.left - pan.x) / zoom,
        y: (e.clientY - rect.top - pan.y) / zoom
      }
      setNodePositions(prev => ({
        ...prev,
        [draggedNode]: {
          x: svgPoint.x,
          y: svgPoint.y
        }
      }))
    } else if (isDragging && !draggedNode) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedNode(null)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Topologie Réseau Interactive
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Diagram */}
      <div
        className="overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
        style={{ height: '600px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          width="800"
          height="650"
          viewBox="0 0 800 650"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0'
          }}
          className="cursor-move"
        >
          {/* Backbone links - Topologie en pentagone */}
          {/* R-internet vers R1-b, R2-b, R3-b, R4-b */}
          <line x1={nodePositions['R-internet'].x} y1={nodePositions['R-internet'].y} 
                x2={nodePositions['R1-b'].x} y2={nodePositions['R1-b'].y} 
                stroke="#ef4444" strokeWidth="2" />
          <line x1={nodePositions['R-internet'].x} y1={nodePositions['R-internet'].y} 
                x2={nodePositions['R2-b'].x} y2={nodePositions['R2-b'].y} 
                stroke="#ef4444" strokeWidth="2" />
          <line x1={nodePositions['R-internet'].x} y1={nodePositions['R-internet'].y} 
                x2={nodePositions['R3-b'].x} y2={nodePositions['R3-b'].y} 
                stroke="#ef4444" strokeWidth="2" />
          <line x1={nodePositions['R-internet'].x} y1={nodePositions['R-internet'].y} 
                x2={nodePositions['R4-b'].x} y2={nodePositions['R4-b'].y} 
                stroke="#ef4444" strokeWidth="2" />
          
          {/* Pentagone entre R1-b, R2-b, R3-b, R4-b (lignes ondulées) */}
          <line x1={nodePositions['R1-b'].x} y1={nodePositions['R1-b'].y} 
                x2={nodePositions['R2-b'].x} y2={nodePositions['R2-b'].y} 
                stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
          <line x1={nodePositions['R2-b'].x} y1={nodePositions['R2-b'].y} 
                x2={nodePositions['R3-b'].x} y2={nodePositions['R3-b'].y} 
                stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
          <line x1={nodePositions['R3-b'].x} y1={nodePositions['R3-b'].y} 
                x2={nodePositions['R4-b'].x} y2={nodePositions['R4-b'].y} 
                stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
          <line x1={nodePositions['R4-b'].x} y1={nodePositions['R4-b'].y} 
                x2={nodePositions['R1-b'].x} y2={nodePositions['R1-b'].y} 
                stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
          
          {/* R1-b vers R3-b (diagonale) */}
          <line x1={nodePositions['R1-b'].x} y1={nodePositions['R1-b'].y} 
                x2={nodePositions['R3-b'].x} y2={nodePositions['R3-b'].y} 
                stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
          
          {/* R-internet vers NAT1 */}
          <line x1={nodePositions['R-internet'].x} y1={nodePositions['R-internet'].y} 
                x2={nodePositions['NAT1'].x} y2={nodePositions['NAT1'].y} 
                stroke="#000000" strokeWidth="2" />
          
          {/* Clouds vers routeurs */}
          <line x1={nodePositions['Cloud1'].x} y1={nodePositions['Cloud1'].y} 
                x2={nodePositions['R1-b'].x} y2={nodePositions['R1-b'].y} 
                stroke="#000000" strokeWidth="2" />
          <line x1={nodePositions['Cloud2'].x} y1={nodePositions['Cloud2'].y} 
                x2={nodePositions['R2-b'].x} y2={nodePositions['R2-b'].y} 
                stroke="#000000" strokeWidth="2" />
          <line x1={nodePositions['Cloud3'].x} y1={nodePositions['Cloud3'].y} 
                x2={nodePositions['R4-b'].x} y2={nodePositions['R4-b'].y} 
                stroke="#000000" strokeWidth="2" />

          {/* Department links - RZ vers Backbone */}
          <line x1={nodePositions['R1-b'].x} y1={nodePositions['R1-b'].y} 
                x2={nodePositions['RZ-1'].x} y2={nodePositions['RZ-1'].y} 
                stroke="#10b981" strokeWidth="2" />
          <line x1={nodePositions['R2-b'].x} y1={nodePositions['R2-b'].y} 
                x2={nodePositions['RZ-2'].x} y2={nodePositions['RZ-2'].y} 
                stroke="#10b981" strokeWidth="2" />
          <line x1={nodePositions['R3-b'].x} y1={nodePositions['R3-b'].y} 
                x2={nodePositions['RZ-3'].x} y2={nodePositions['RZ-3'].y} 
                stroke="#10b981" strokeWidth="2" />
          <line x1={nodePositions['R4-b'].x} y1={nodePositions['R4-b'].y} 
                x2={nodePositions['RZ-4'].x} y2={nodePositions['RZ-4'].y} 
                stroke="#10b981" strokeWidth="2" />

          {/* Routers - Draggable */}
          {Object.entries(nodePositions).map(([name, pos]) => {
            const isBackbone = name.includes('-b')
            const isInternet = name === 'R-internet'
            const isCloud = name.startsWith('Cloud') || name === 'NAT1'
            const isRZ = name.startsWith('RZ')
            
            let fill, icon, routerType
            if (isInternet) {
              fill = '#ef4444'
              icon = 'router'
              routerType = 'c7200'
            } else if (isBackbone) {
              fill = '#3b82f6'
              icon = 'router'
              routerType = 'c7200'
            } else if (isCloud) {
              fill = '#60a5fa'
              icon = 'cloud'
              routerType = null
            } else if (isRZ) {
              fill = '#10b981'
              icon = 'router'
              routerType = 'c3745'
            } else {
              fill = '#94a3b8'
              icon = 'device'
              routerType = null
            }
            
            return (
              <g key={name}>
                {icon === 'cloud' ? (
                  <ellipse
                    cx={pos.x}
                    cy={pos.y}
                    rx="25"
                    ry="15"
                    fill={fill}
                    stroke="#fff"
                    strokeWidth="2"
                    className="cursor-move hover:opacity-80"
                    data-node={name}
                  />
                ) : (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="20"
                    fill={fill}
                    stroke="#fff"
                    strokeWidth="2"
                    className="cursor-move hover:opacity-80"
                    data-node={name}
                  />
                )}
                <text
                  x={pos.x}
                  y={pos.y + (icon === 'cloud' ? 30 : 40)}
                  textAnchor="middle"
                  className="text-xs fill-gray-900 dark:fill-gray-100 font-medium pointer-events-none"
                >
                  {name}
                </text>
                {routerType && (
                  <text
                    x={pos.x}
                    y={pos.y + (icon === 'cloud' ? 45 : 55)}
                    textAnchor="middle"
                    className="text-[10px] fill-gray-600 dark:fill-gray-400 font-mono pointer-events-none"
                  >
                    {routerType}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-700 dark:text-gray-300">R-internet (c7200)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Backbone (R1-b à R4-b, c7200)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-sky-400"></div>
            <span className="text-gray-700 dark:text-gray-300">Clouds & NAT</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Départements (RZ1-RZ4, c3745)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-red-500"></div>
            <span className="text-gray-700 dark:text-gray-300">Liaisons R-internet</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-blue-500 border-dashed"></div>
            <span className="text-gray-700 dark:text-gray-300">Liaisons Backbone (Serial)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-black"></div>
            <span className="text-gray-700 dark:text-gray-300">Liaisons Clouds</span>
          </div>
        </div>
        
        {/* Explications choix routeurs */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Justification du Choix des Routeurs</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                Routeurs Backbone : Cisco 7200 (c7200)
              </h5>
              <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300 ml-4">
                <li><strong>Performance élevée</strong> : Capacité de traitement importante pour gérer le trafic inter-départements</li>
                <li><strong>Interfaces multiples</strong> : Support de nombreuses interfaces Serial pour le maillage OSPF</li>
                <li><strong>Scalabilité</strong> : Peut gérer de grandes tables de routage OSPF</li>
                <li><strong>Fiabilité</strong> : Architecture robuste pour le backbone critique</li>
                <li><strong>Support OSPF avancé</strong> : Optimisé pour les protocoles de routage complexes</li>
                <li><strong>NAT performant</strong> : Capacité de traduction d'adresses à haut débit</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Routeurs Départementaux : Cisco 3745 (c3745)
              </h5>
              <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-300 ml-4">
                <li><strong>Coût optimisé</strong> : Solution économique pour les besoins départementaux</li>
                <li><strong>Suffisant pour LAN</strong> : Capacité adaptée au trafic local (7170 à 112 employés)</li>
                <li><strong>DHCP intégré</strong> : Support natif du serveur DHCP pour les PCs</li>
                <li><strong>Simplicité</strong> : Configuration plus simple que les routeurs backbone</li>
                <li><strong>Maintenance facilitée</strong> : Moins de complexité pour les équipes IT locales</li>
                <li><strong>Routage statique</strong> : Suffisant pour les besoins de routage départemental</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Note :</strong> Les nœuds du diagramme sont <strong>déplaçables</strong> ! Cliquez et glissez-les pour réorganiser la topologie selon vos besoins.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkDiagram

