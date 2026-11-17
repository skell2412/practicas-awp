import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Leemos las variables probando tanto con NEXT_PUBLIC_ como sin él por seguridad
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log('URL cargada en servidor:', supabaseUrl);
console.log('Key cargada en servidor:', supabaseKey ? 'OK (Oculta por seguridad)' : 'NO ENCONTRADA');

export const createClient = async() => {
    const cookieStore = await cookies();
    
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Your project's URL and Key are required to create a Supabase client!");
    }

    return createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                    } catch {
                        // The `setAll` method was called from a Server Component.
                    }
                },
            },
        },
    );
};