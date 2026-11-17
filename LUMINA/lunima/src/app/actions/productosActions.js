'use server'

import { createClient } from '@/app/lib/supServer'; 
import { revalidatePath } from 'next/cache';

export async function eliminarProducto(id) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error al eliminar:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/productos'); 
    return { success: true };
}