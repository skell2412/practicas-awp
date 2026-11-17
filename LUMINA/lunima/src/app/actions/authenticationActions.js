import { createClient } from '../lib/supServer'; 

export async function signInWithEmail(email, password) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        throw error;
    }
    return data;
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
}