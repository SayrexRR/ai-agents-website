import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://crdrcbwnxzgibwbbbvvf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZHJjYndueHpnaWJ3YmJidnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMTM2NTYsImV4cCI6MjA3MzU4OTY1Nn0.PMrU2f-XG7TN4lNFEh7p0VemzGZB-H6laayCTZlcSzw";

export const supabase = createClient(supabaseUrl, supabaseKey);