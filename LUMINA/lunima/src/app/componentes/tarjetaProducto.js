'use client'

import { useState } from 'react';
// Ya no necesitamos importar Image de 'next/image' si usamos un <img> tradicional
import { eliminarProducto } from '../actions/productosActions';

export default function TarjetaProducto({ productos }) {
    const [agregado, setAgregado] = useState([]);
    const [cargando, setCargando] = useState(false);

    const handleEliminar = async () => {
        const confirmacion = window.confirm(`¿Estás seguro de eliminar "${productos.nombre}"?`);

        if (confirmacion) {
            setCargando(true);

            try {
                const result = await eliminarProducto(productos.id);

                if (result.success === false) {
                    alert('Hubo un error al eliminar el producto');
                }
            } catch (error) {
                alert('Ocurrió un error inesperado al eliminar el producto');
            } finally {
                setCargando(false);
            }
        }
    };

    return (
        <section>
            <br></br>
            <div className="">
                <div key={productos.id}>
                    <div className="bg-black-900 py-16">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <div className="relative overflow-hidden w-full h-48"> {/* Añadí un alto fijo contenedor para la imagen */}
                                        {/* Cambiamos <Image /> por un <img> nativo para URLs externas de Supabase */}
                                        <img
                                            className="object-cover w-full h-full"
                                            src={productos.imagen}
                                            alt={productos.nombre}
                                        />
                                        <div className="absolute inset-0 bg-black opacity-40"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">View Product</button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mt-4">{productos.nombre}</h3>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-gray-900 font-bold text-lg">{productos.precio}</span>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setAgregado([...agregado, productos.id])}
                                                className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                                                {agregado.includes(productos.id) ? 'Agregado' : 'Agregar'}
                                            </button>

                                            <button
                                                onClick={handleEliminar}
                                                disabled={cargando}
                                                className={`text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                        stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </span>
                                                <span className="hidden md:inline-block">
                                                    {cargando ? 'Borrando...' : 'Eliminar'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}