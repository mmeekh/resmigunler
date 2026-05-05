import { createClient } from '@supabase/supabase-js'

// Read from Vite env at build time. Falls back to the previously-hardcoded
// project to keep the existing deployment working without forcing every
// environment to set new variables on day one.
const supabaseUrl =
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  'https://kexkzudunwhztxmkpyik.supabase.co';

const supabaseAnonKey =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleGt6dWR1bndoenR4bWtweWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MzEyMzIsImV4cCI6MjA4MTIwNzIzMn0.RcG3h8RoEYRM7VHJ9dkaPu9GH-h_NWoMaX_QLnyCZZA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
