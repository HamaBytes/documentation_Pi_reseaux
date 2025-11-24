import { useState, useEffect, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

const CodeBlock = ({ code, language = 'text', filename }) => {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      {filename && (
        <div className="px-4 py-2 bg-gray-800 dark:bg-gray-900 text-gray-300 text-sm font-mono rounded-t-lg border-b border-gray-700">
          {filename}
        </div>
      )}
      <div className="relative">
          <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <code ref={codeRef} className={`language-${language}`}>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copier"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}

export default CodeBlock

