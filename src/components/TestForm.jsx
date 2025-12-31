import { useState, useEffect } from 'react'
import { supabase, configStatus } from '../lib/supabaseClient'
import { departments } from '../data/networkData'
import { Plus, Image, UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

const TestForm = ({ onSaved }) => {
  const [department, setDepartment] = useState(departments[0]?.name || '')
  const [service, setService] = useState('')
  const [server, setServer] = useState('')
  const [testName, setTestName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  // Use a configurable bucket name, could be moved to env/constants later if needed
  const BUCKET_NAME = 'image'

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const uploadFile = async (file) => {
    const id = uuidv4()
    // Sanitize filename to avoid path issues
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const path = `screenshots/${id}_${cleanName}`

    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(path, file)
    if (error) throw error

    const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path)
    return publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!configStatus.isConfigured) {
      setNotification({ type: 'error', message: 'Supabase configuration missing in .env' })
      return
    }

    setLoading(true)
    try {
      const uploadedUrls = []
      for (const f of files) {
        try {
          const url = await uploadFile(f)
          uploadedUrls.push(url)
        } catch (uploadError) {
          console.error("Upload failed for file:", f.name, uploadError)
          throw new Error(`Failed to upload ${f.name}. Check bucket permissions.`)
        }
      }

      const { data, error } = await supabase
        .from('tests')
        .insert([
          {
            department,
            service,
            server,
            test_name: testName,
            description,
            status,
            screenshot_urls: uploadedUrls
          }
        ])
        .select() // Ensure we get the return data for onSaved

      if (error) throw error

      setService('')
      setServer('')
      setTestName('')
      setDescription('')
      setStatus('pending')
      setFiles([])
      setNotification({ type: 'success', message: 'Test result saved successfully!' })

      if (onSaved && data) onSaved(data[0])
    } catch (err) {
      console.error('Error saving test', err)
      setNotification({ type: 'error', message: err.message || 'Error saving test result' })
    } finally {
      setLoading(false)
    }
  }

  if (!configStatus.isConfigured) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">
          Supabase is not configured. Environment variables missing.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-surface-800 p-6 rounded-xl border border-surface-200 dark:border-surface-700 shadow-sm animate-fade-in">

      {notification && (
        <div className={`p-3 rounded-lg flex items-center gap-2 text-sm animate-slide-up ${notification.type === 'success'
            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
          }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {notification.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 shadow-sm outline-none transition-all">
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Service</label>
          <input placeholder="Ex: NFS Share" value={service} onChange={(e) => setService(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 shadow-sm outline-none transition-all" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Server</label>
          <input placeholder="Ex: VM-01" value={server} onChange={(e) => setServer(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 shadow-sm outline-none transition-all" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Test Name</label>
        <input placeholder="Verification Test Name" value={testName} onChange={(e) => setTestName(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 shadow-sm outline-none transition-all" />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">Details</label>
        <textarea placeholder="Describe the test results..." value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2.5 rounded-lg border border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary-500 shadow-sm outline-none transition-all min-h-[100px]" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="flex items-center space-x-2 cursor-pointer group p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors border border-dashed border-surface-300 dark:border-surface-600">
            <Image className="w-5 h-5 text-surface-500 group-hover:text-primary-500 transition-colors" />
            <span className="text-sm font-medium text-surface-600 dark:text-surface-300">Add Screenshots</span>
            <input type="file" onChange={handleFiles} multiple className="hidden" accept="image/*" />
          </label>

          <div className="flex bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
            {['pending', 'pass', 'fail'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${status === s
                    ? s === 'pass' ? 'bg-green-500 text-white shadow-sm'
                      : s === 'fail' ? 'bg-red-500 text-white shadow-sm'
                        : 'bg-white dark:bg-surface-600 text-surface-900 dark:text-surface-100 shadow-sm'
                    : 'text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-200'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full sm:w-auto px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg shadow-primary-500/20 hover:shadow-primary-600/30 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <UploadCloud className="w-5 h-5" />
          )}
          <span>{loading ? 'Saving...' : 'Save Result'}</span>
        </button>
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((f, idx) => (
            <div key={idx} className="bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full text-xs text-surface-600 dark:text-surface-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              {f.name}
            </div>
          ))}
        </div>
      )}
    </form>
  )
}

export default TestForm
