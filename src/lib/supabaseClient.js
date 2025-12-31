import { createClient } from '@supabase/supabase-js'

// Support both Vite (VITE_*) and React-style REACT_APP_* env names
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || import.meta.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY || import.meta.env.REACT_APP_SUPABASE_KEY

const isConfigured = !!(SUPABASE_URL && SUPABASE_KEY)

if (!isConfigured) {
  console.warn('Supabase URL or Key not found in env. Features requiring backend will be disabled.')
}

export const supabase = isConfigured
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : {
    from: () => ({
      select: () => ({ data: [], error: new Error('Supabase not configured') }),
      insert: () => ({ data: null, error: new Error('Supabase not configured') }),
      upload: () => ({ data: null, error: new Error('Supabase not configured') }),
      getPublicUrl: () => ({ publicUrl: '' })
    }),
    storage: {
      from: () => ({
        upload: () => ({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ publicUrl: '' })
      })
    }
  }

export const configStatus = {
  isConfigured,
  message: isConfigured
    ? 'Supabase configured'
    : 'Supabase credentials missing. Check .env file.'
}
