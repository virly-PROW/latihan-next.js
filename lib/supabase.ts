import {createClient} from "@supabase/supabase-js";

//klien dengan kata kunci PUBLIK aman dibca orang lain
// dan hanya bisa melakukan apa yang diizinkan oleh aturan database

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
)
;