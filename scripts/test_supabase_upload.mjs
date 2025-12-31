import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY || process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.REACT_APP_SUPABASE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Supabase env vars not set. Please set VITE_SUPABASE_URL and VITE_SUPABASE_KEY (or REACT_APP_*).')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// 1x1 transparent PNG (base64)
const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn8B9qVt2QAAAABJRU5ErkJggg=='
const buffer = Buffer.from(base64, 'base64')
const filename = `test_${Date.now()}.png`
const path = `screenshots/${filename}`

;(async () => {
  try {
    console.log('Uploading file to bucket `image` at path:', path)
    const { data, error } = await supabase.storage.from('image').upload(path, buffer, { contentType: 'image/png' })
    if (error) throw error
    console.log('Upload response:', data)

    const { data: publicData } = supabase.storage.from('image').getPublicUrl(path)
    console.log('Public URL:', publicData.publicUrl)

    // Insert a test row if table exists
    console.log('Inserting test row into `tests` table...')
    const { data: insertData, error: insertError } = await supabase.from('tests').insert([
      {
        department: 'LocalTest',
        service: 'Unit',
        server: 'Local',
        test_name: 'Upload test',
        description: 'Automated upload test',
        status: 'pass',
        screenshot_urls: [publicData.publicUrl]
      }
    ]).select('*')

    if (insertError) {
      console.error('Insert error:', insertError)
      process.exit(2)
    }

    console.log('Inserted row:', insertData)
    console.log('Test complete — you should see a new row in the `tests` table and a public file at the printed URL.')
  } catch (err) {
    console.error('Error during test:', err)
    process.exit(3)
  }
})()
