'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'login-styles';
        style.innerHTML = `
            .login-page-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                min-height: 80vh;
            }
            .container-login {
                position: relative;
                width: 350px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 20px;
                text-align: center;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(10px);
            }
            .container-login h2 {
                color: white;
                margin-bottom: 20px;
            }
            .input-group {
                margin-bottom: 15px;
                text-align: left;
            }
            .input-group label {
                display: block;
                font-size: 14px;
                color: #aaa;
            }
            .input-group input {
                width: 95%;
                padding: 10px;
                border: none;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                color: white;
                font-size: 14px;
            }
            .submit-btn {
                display: block;
                width: 100%;
                padding: 10px;
                background: #1f2d52;
                color: white;
                text-align: center;
                border-radius: 25px;
                text-decoration: none;
                font-weight: bold;
                margin-top: 10px;
                cursor: pointer;
                border: none;
            }
            .submit-btn:hover {
                background: #293b6a;
            }
            .error-text {
                color: #ff6b6b;
                font-size: 13px;
                margin-top: 10px;
            }
        `;
        document.head.appendChild(style);

        return () => {
            const existingStyle = document.getElementById('login-styles');
            if (existingStyle) existingStyle.remove();
        };
    }, []);

    const handleLoginClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            );

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/productos');
            router.refresh();
        } catch (error) {
            setErrorMsg('Correo o contraseña incorrectos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper" style={{ background: '#0b0f1a', margin: 0, fontFamily: 'Arial, sans-serif' }}>
            <div className="container-login">
                <h2>LOGIN</h2>
                <form onSubmit={handleLoginClick}>
                    <div className="input-group">
                        <label>CORREO / USERNAME</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="tu_correo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMsg && <p className="error-text">{errorMsg}</p>}
                    <button type="submit" className="submit-btn" id="loginBtn" disabled={loading}>
                        {loading ? 'INGRESANDO...' : 'LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    );
}