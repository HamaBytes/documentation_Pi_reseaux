import { useState } from 'react'

const TestDetail = ({ test }) => {
  if (!test) return <div>Sélectionnez un test pour voir les détails.</div>

  return (
    <div className="space-y-4">
      <div className="p-3 border rounded">
        <div className="text-lg font-semibold">{test.test_name}</div>
        <div className="text-sm text-gray-500">{test.department} / {test.service} / {test.server}</div>
        <div className="mt-2">{test.description}</div>
        <div className="mt-2">Status: <strong>{test.status}</strong></div>
      </div>

      {test.screenshot_urls && test.screenshot_urls.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {test.screenshot_urls.map((u, idx)=> (
            <img key={idx} src={u} alt={`screenshot-${idx}`} className="w-full h-48 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  )
}

export default TestDetail
