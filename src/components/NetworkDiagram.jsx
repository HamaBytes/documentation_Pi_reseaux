import { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCcw, Router, Cloud, Monitor, Server, Globe } from 'lucide-react'

const NetworkDiagram = () => {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [draggedNode, setDraggedNode] = useState(null)

  // Initial positions optimized for Full Mesh + Departments
  const [nodePositions, setNodePositions] = useState({
    'R-Internet': { x: 400, y: 80 },
    // Backbone Ring (Outer)
    'R1': { x: 250, y: 250 },
    'R2': { x: 550, y: 250 },
    'R3': { x: 550, y: 450 },
    'R4': { x: 250, y: 450 },
    // Departments (Below)
    'RZ-1': { x: 150, y: 350 },  // Marketing
    'RZ-2': { x: 400, y: 560 },  // IT
    'RZ-3': { x: 650, y: 560 },  // DB
    'RZ-4': { x: 150, y: 550 },  // Collab
  })

  // Links definition for easier rendering
  // Full Mesh: R1-R2, R2-R3, R3-R4, R4-R1, R1-R3, R2-R4
  const backboneLinks = [
    ['R1', 'R2'], ['R2', 'R3'], ['R3', 'R4'], ['R4', 'R1'], // Ring
    ['R1', 'R3'], ['R2', 'R4'] // Cross connections for Full Mesh
  ]

  const uplinkLinks = [
    { from: 'R-Internet', to: 'R1' },
    { from: 'R-Internet', to: 'R2' },
    { from: 'R-Internet', to: 'R3' },
    { from: 'R-Internet', to: 'R4' },
  ]

  const departmentLinks = [
    { from: 'R1', to: 'RZ-1' },
    { from: 'R2', to: 'RZ-2' },
    { from: 'R3', to: 'RZ-3' },
    { from: 'R4', to: 'RZ-4' },
  ]

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 2))
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setNodePositions({
      'R-Internet': { x: 400, y: 80 },
      'R1': { x: 250, y: 250 },
      'R2': { x: 550, y: 250 },
      'R3': { x: 550, y: 450 },
      'R4': { x: 250, y: 450 },
      'RZ-1': { x: 150, y: 350 },
      'RZ-2': { x: 400, y: 560 },
      'RZ-3': { x: 650, y: 560 },
      'RZ-4': { x: 150, y: 550 },
    })
  }

  const handleMouseDown = (e) => {
    const nodeName = e.target.getAttribute('data-node') || e.target.parentNode.getAttribute('data-node')
    if (nodeName) {
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
        [draggedNode]: { x: svgPoint.x, y: svgPoint.y }
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
    <div className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 p-6 shadow-sm transition-all duration-300">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-500" />
            Network Topology
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400">Interactive Full Mesh Backbone & Departmental Links</p>
        </div>

        <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-700 p-1 rounded-lg border border-surface-200 dark:border-surface-600">
          <button onClick={handleZoomOut} className="p-2 rounded-md hover:bg-white dark:hover:bg-surface-600 hover:shadow-sm text-surface-600 dark:text-surface-300 transition-all">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-medium text-surface-600 dark:text-surface-300 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={handleZoomIn} className="p-2 rounded-md hover:bg-white dark:hover:bg-surface-600 hover:shadow-sm text-surface-600 dark:text-surface-300 transition-all">
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-surface-300 dark:bg-surface-600 mx-1"></div>
          <button onClick={handleReset} className="p-2 rounded-md hover:bg-white dark:hover:bg-surface-600 hover:shadow-sm text-surface-600 dark:text-surface-300 transition-all">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden border border-surface-200 dark:border-surface-700 rounded-xl bg-surface-50 dark:bg-surface-900 relative shadow-inner cursor-move group"
        style={{ height: '600px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 650"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="25" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Links */}
          {/* Uplinks (Red) */}
          {uplinkLinks.map((link, i) => (
            <line key={`up-${i}`}
              x1={nodePositions[link.from].x} y1={nodePositions[link.from].y}
              x2={nodePositions[link.to].x} y2={nodePositions[link.to].y}
              stroke="#ef4444" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="5,5"
            />
          ))}

          {/* Backbone Mesh (Blue) */}
          {backboneLinks.map(([n1, n2], i) => (
            <line key={`bb-${i}`}
              x1={nodePositions[n1].x} y1={nodePositions[n1].y}
              x2={nodePositions[n2].x} y2={nodePositions[n2].y}
              stroke="#6366f1" strokeWidth="3" strokeOpacity="0.8"
            />
          ))}

          {/* Department Links (Green) */}
          {departmentLinks.map((link, i) => (
            <line key={`dept-${i}`}
              x1={nodePositions[link.from].x} y1={nodePositions[link.from].y}
              x2={nodePositions[link.to].x} y2={nodePositions[link.to].y}
              stroke="#10b981" strokeWidth="2"
            />
          ))}

          {/* Nodes */}
          {Object.entries(nodePositions).map(([name, pos]) => {
            const isInternet = name === 'R-Internet'
            const isBackbone = ['R1', 'R2', 'R3', 'R4'].includes(name)

            let fillColor = isInternet ? '#ef4444' : isBackbone ? '#6366f1' : '#10b981'
            let RouterIcon = isInternet ? Globe : Router

            return (
              <g key={name} transform={`translate(${pos.x}, ${pos.y})`} className="cursor-pointer hover:opacity-90 transition-opacity" data-node={name}>
                {/* Node Glow */}
                <circle r="25" fill={fillColor} fillOpacity="0.15" className="animate-pulse-slow" />

                {/* Node Shape */}
                <circle r="18" fill={fillColor} stroke="white" strokeWidth="2" className="shadow-lg drop-shadow-md" />

                {/* Avoid Lucide dependency inside SVG by simple text/emoji or path fallback if needed, 
                    but pure SVG icons are cleaner. Ideally we map icons to simple SVG paths here.
                    For simplicity in this robust implementation, we stick to shapes + labels or generic paths. 
                */}

                {/* Simple Router Icon Path */}
                <path d="M-8,-4 h16 v8 h-16 z M-5,4 v2 M0,4 v2 M5,4 v2" stroke="white" strokeWidth="1.5" fill="none" transform="translate(0,-1) scale(0.8)" />

                {/* Label */}
                <text y="35" textAnchor="middle" className="text-xs font-bold fill-surface-700 dark:fill-surface-200 pointer-events-none select-none" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  {name}
                </text>

                <text y="48" textAnchor="middle" className="text-[9px] font-mono fill-surface-500 dark:fill-surface-400 pointer-events-none select-none uppercase tracking-wider">
                  {isInternet ? 'ISP Gateway' : isBackbone ? 'C7200 Core' : 'C3745 Edge'}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Floating Controls / Legend Overlay could go here */}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-50 dark:bg-surface-900/50 p-4 rounded-lg border border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
            <span className="font-semibold text-sm text-surface-700 dark:text-surface-200">Backbone Core</span>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400">
            Full-mesh topology utilizing high-performance <strong>Cisco 7200</strong> routers. Supports heavy inter-departmental traffic and redundancy.
          </p>
        </div>

        <div className="bg-surface-50 dark:bg-surface-900/50 p-4 rounded-lg border border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="font-semibold text-sm text-surface-700 dark:text-surface-200">Department Edge</span>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400">
            <strong>Cisco 3745</strong> ISR routers providing local LAN services, NAT, and DHCP. Connected via GigabitEthernet to Core.
          </p>
        </div>

        <div className="bg-surface-50 dark:bg-surface-900/50 p-4 rounded-lg border border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="font-semibold text-sm text-surface-700 dark:text-surface-200">Internet Gateway</span>
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400">
            WAN connectivity point. Simulates ISP connection via Frame Relay or Serial Hols for external access.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NetworkDiagram

