'use client'

import { useEffect, useState } from 'react';
import { crearContacto } from '../actions/contactosAction'; 

export default function ContactoPage() {
    const [email, setEmail] = useState('');
    const [motivo, setMotivo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedEmail = JSON.parse(localStorage.getItem('email'));
        const savedMotivo = JSON.parse(localStorage.getItem('motivo'));
        const savedMensaje = JSON.parse(localStorage.getItem('mensaje'));

        if (savedEmail) setEmail(savedEmail);
        if (savedMotivo) setMotivo(savedMotivo);
        if (savedMensaje) setMensaje(savedMensaje);
    }, []);

    useEffect(() => {
        localStorage.setItem('email', JSON.stringify(email));
    }, [email]);

    useEffect(() => {
        localStorage.setItem('motivo', JSON.stringify(motivo));
    }, [motivo]);

    useEffect(() => {
        localStorage.setItem('mensaje', JSON.stringify(mensaje));
    }, [mensaje]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await crearContacto({ email, motivo, mensaje });

        setLoading(false);

        if (result.success) {
            alert('¡Mensaje enviado con éxito!');
            setEmail('');
            setMotivo('');
            setMensaje('');
            
            localStorage.removeItem('email');
            localStorage.removeItem('motivo');
            localStorage.removeItem('mensaje'); 
        } else {
            alert('Hubo un error: ' + result.error);
        }
    }

    return (
        <div className="p-8 mt-8 max-w-lg mx-auto">
            <h1 className="text-4xl text-white-800 sm:text-4xl font-bold mb-4">Contact Form</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="p-2 w-full">
                    <div className="relative">
                        <label className="leading-7 py-4 text-lg text-white-900">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            id="email" 
                            name="email" 
                            required
                            className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out" 
                        />
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div className="relative">
                        <label className="leading-7 py-4 text-lg text-white-900">Motivo</label>
                        <input 
                            type="text" 
                            value={motivo} 
                            onChange={e => setMotivo(e.target.value)} 
                            id="motivo" 
                            name="motivo" 
                            required
                            className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out" 
                        />
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div className="relative">
                        <label className="leading-7 py-4 text-lg text-white-900">Mensaje</label>
                        <textarea 
                            id="mensaje" 
                            value={mensaje} 
                            onChange={e => setMensaje(e.target.value)} 
                            name="mensaje" 
                            required
                            className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex text-white bg-gray-900 border-0 py-3 px-6 focus:outline-none hover:bg-blue-900 rounded text-xl font-bold shadow-lg mx-0 flex-col text-center disabled:opacity-50"
                        >
                            {loading ? 'Enviando...' : 'Send'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}