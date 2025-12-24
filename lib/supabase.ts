import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kexkzudunwhztxmkpyik.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleGt6dWR1bndoenR4bWtweWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MzEyMzIsImV4cCI6MjA4MTIwNzIzMn0.RcG3h8RoEYRM7VHJ9dkaPu9GH-h_NWoMaX_QLnyCZZA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
