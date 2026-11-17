'use server'

import { createClient } from '@/app/lib/supServer';
import { revalidatePath } from 'next/cache';

export async function crearContacto({ email, motivo, mensaje }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('contacto')
        .insert({ 
            email: email, 
            motivo: motivo, 
            mensaje: mensaje 
        });

    if (error) {
        console.error('Error al crear contacto:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/contacto'); 
    
    return { success: true };
}