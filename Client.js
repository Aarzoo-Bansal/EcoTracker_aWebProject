import { createClient } from '@supabase/supabase-js'

const URL = 'https://bzxjpwrjyohqxkgbhetn.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6eGpwd3JqeW9ocXhrZ2JoZXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NzQ5MjgsImV4cCI6MjA0NzU1MDkyOH0.sd_4l_q8klfzWKuKaAZWUGX-qFmGigsETadAWOB769A'

export const supabase = createClient(URL, API_KEY)