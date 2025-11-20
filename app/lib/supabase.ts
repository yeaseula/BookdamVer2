import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://isbhgfjxyqcsjoqnmqml.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzYmhnZmp4eXFjc2pvcW5tcW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MDU2NTksImV4cCI6MjA3OTE4MTY1OX0.IxneB8ShYAqACm353MB2wiPjQlnZDo_JVCI2Ac1KMUs'
export const supabase = createClient(supabaseUrl, supabaseKey)