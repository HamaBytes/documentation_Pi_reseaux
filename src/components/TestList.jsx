import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const TestList = ({ onSelect }) => {
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTests = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('tests').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setTests(data)
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la récupération des tests: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchTests()
  }, [])

  return (
    <div className="space-y-2">
      {loading && <div>Chargement...</div>}
      <ul className="space-y-2">
        {tests.map(t => (
          <li key={t.id} className="p-3 border rounded hover:bg-gray-50 cursor-pointer" onClick={()=>onSelect && onSelect(t)}>
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{t.test_name}</div>
                <div className="text-sm text-gray-500">{t.department} / {t.service} / {t.server}</div>
              </div>
              <div className="text-sm">{t.status}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TestList
