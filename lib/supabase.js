import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://awzzxgwguthqkwgkbnfo.supabase.co"; // Ganti dengan URL proyek kamu
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3enp4Z3dndXRocWt3Z2tibmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODU1MzQsImV4cCI6MjA2ODY2MTUzNH0.RrwCyLQC0s8PgVIngmBaLIOEzLRv-6HAGS25g0IIIOU"; // Ganti dengan public anon key kamu
export const supabase = createClient(supabaseUrl, supabaseKey);
