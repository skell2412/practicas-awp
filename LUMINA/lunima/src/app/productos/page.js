import TarjetaProducto from '../componentes/tarjetaProducto';
import LogoutButton from '../componentes/LogoutButton'; 
import { createClient } from '../lib/supServer'

async function getProductos() {
    const supabase = await createClient()

    const { data: productos, error } = await supabase
        .from('productos')
        .select('id, nombre, descripcion, precio, imagen');

    if (error) {
        console.error('Error al obtener productos:', error.message);
        return [];
    }

    return productos;
}

export default async function ProductosPage() {
    const productos = await getProductos();
    return (
        <section className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Catálogo de productos</h2>
                <LogoutButton /> 
            </div>
            {productos.map((item) => (
                <TarjetaProducto key={item.id + 1} productos={item} />
            ))}
        </section>
    );
}