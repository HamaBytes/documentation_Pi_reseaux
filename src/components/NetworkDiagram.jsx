import { useState } from 'react'
import { departments, backboneLinks, departmentLinks } from '../data/networkData'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

const NetworkDiagram = () => {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 2))
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Router positions
  const routerPositions = {
    'R-Internet': { x: 400, y: 50 },
    'R1': { x: 200, y: 200 },
    'R2': { x: 400, y: 200 },
    'R3': { x: 600, y: 200 },
    'R4': { x: 300, y: 350 },
    'RZ-1': { x: 150, y: 500 },
    'RZ-2': { x: 350, y: 500 },
    'RZ-3': { x: 550, y: 500 },
    'RZ-4': { x: 250, y: 650 }
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
          height="700"
          viewBox="0 0 800 700"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0'
          }}
          className="cursor-move"
        >
          {/* Backbone links */}
          {backboneLinks.map((link, idx) => {
            const fromPos = routerPositions[link.from] || routerPositions['R-Internet']
            const toPos = routerPositions[link.to] || routerPositions['R1']
            return (
              <line
                key={`backbone-${idx}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )
          })}

          {/* Department links */}
          {departmentLinks.map((link, idx) => {
            const backboneRouter = link.backbone
            const deptRouter = link.router
            const fromPos = routerPositions[backboneRouter] || { x: 300, y: 200 }
            const toPos = routerPositions[deptRouter] || { x: 300, y: 500 }
            return (
              <line
                key={`dept-${idx}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="#10b981"
                strokeWidth="2"
              />
            )
          })}

          {/* Routers */}
          {Object.entries(routerPositions).map(([name, pos]) => {
            const isBackbone = name.startsWith('R') && !name.startsWith('RZ')
            const isInternet = name === 'R-Internet'
            const fill = isInternet ? '#ef4444' : isBackbone ? '#3b82f6' : '#10b981'
            
            return (
              <g key={name}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill={fill}
                  stroke="#fff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80"
                />
                <text
                  x={pos.x}
                  y={pos.y + 40}
                  textAnchor="middle"
                  className="text-xs fill-gray-900 dark:fill-gray-100 font-medium"
                >
                  {name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-gray-700 dark:text-gray-300">R-Internet</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Backbone (R1-R4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Départements (RZ1-RZ4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 bg-blue-500 border-dashed border-2"></div>
          <span className="text-gray-700 dark:text-gray-300">Liaisons Backbone</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-1 bg-green-500"></div>
          <span className="text-gray-700 dark:text-gray-300">Liaisons Départements</span>
        </div>
      </div>
    </div>
  )
}

export default NetworkDiagram

