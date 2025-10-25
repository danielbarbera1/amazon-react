import React, { useState } from 'react';

const InicioRegistro = ({ mode = 'login', onClose, onModeChange, onLogin }) => {
        const active = mode === 'register' ? 'register' : 'login';

            const [loginUsername, setLoginUsername] = useState('');
            const [loginPassword, setLoginPassword] = useState('');
            const [loading, setLoading] = useState(false);
            const [loginResult, setLoginResult] = useState(null);

            const handleSwitch = (m) => {
                if (onModeChange) onModeChange(m);
            };

            const handleLoginSubmit = async (e) => {
                e.preventDefault();
                setLoading(true);
                setLoginResult(null);
                try {
                    const res = await fetch('https://dummyjson.com/user/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: loginUsername,
                            password: loginPassword,
                            expiresInMins: 30,
                        }),
                    });

                    const data = await res.json();
                        if (!res.ok) {
                            setLoginResult({ error: data.message || 'Error en login' });
                        } else {
                            setLoginResult({ success: data });
                        // opcional: guardar token en localStorage
                        if (data && data.token) {
                            try { localStorage.setItem('token', data.token); } catch (err) { /* ignore */ }
                        }
                            // notify parent (App) about successful login with user info
                            try {
                                const userData = data.user || data;
                                if (onLogin) onLogin(userData);
                                try { localStorage.setItem('user', JSON.stringify(userData)); } catch (err) { /* ignore */ }
                            } catch (e) {
                                // ignore
                            }
                        // cerrar modal después de un breve delay para mostrar resultado
                        setTimeout(() => { if (onClose) onClose(); }, 900);
                    }
                } catch (err) {
                    setLoginResult({ error: String(err?.message || err) });
                } finally {
                    setLoading(false);
                }
            };

        return (
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
            <div className="md:flex">
                {/* Panel izquierdo con información */}
                <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">¡Bienvenido!</h2>
                    <p className="mb-6">Únete a nuestra comunidad y descubre todas las funcionalidades que tenemos para ofrecerte.</p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <i className="fas fa-check-circle text-green-300 mr-3"></i>
                            <span>Acceso a todas las funciones</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-check-circle text-green-300 mr-3"></i>
                            <span>Contenido exclusivo</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-check-circle text-green-300 mr-3"></i>
                            <span>Soporte prioritario</span>
                        </div>
                    </div>
                </div>
                
                {/* Panel derecho con formularios */}
                <div className="md:w-1/2 p-6 md:p-8">
                    {/* Botones de cambio */}
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => handleSwitch('login')}
                            className={`form-switch flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${active === 'login' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSwitch('register')}
                            className={`form-switch flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${active === 'register' ? 'bg-blue-600 text-white shadow' : 'text-gray-600'}`}
                        >
                            Registrarse
                        </button>
                    </div>

                    {/* Formularios (render condicional para evitar solapamientos) */}
                    {active === 'login' ? (
                      <div id="login-form" className="form-container">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Inicia Sesión</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-email">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                                    <input
                                        id="login-email"
                                        type="text"
                                        value={loginUsername}
                                        onChange={(e) => setLoginUsername(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="usuario o email"
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login-password">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                                    <input
                                        id="login-password"
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Recordarme
                                    </label>
                                </div>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <button type="submit" disabled={loading} className={`w-full font-medium py-2 px-4 rounded-lg transition duration-300 ${loading ? 'bg-gray-300 text-gray-700' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                            </button>
                        </form>

                        {/* Resultado del login */}
                        {loginResult?.error && (
                            <div className="mt-4 text-sm text-red-600">Error: {loginResult.error}</div>
                        )}
                        {loginResult?.success && (
                            <div className="mt-4 text-sm text-green-600">
                                Autenticado como <strong>{loginResult.success.username || loginResult.success.user?.username}</strong>
                            </div>
                        )}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">O inicia sesión con</p>
                            <div className="flex justify-center space-x-4 mt-3">
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300">
                                    <i className="fab fa-google text-red-500"></i>
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300">
                                    <i className="fab fa-facebook text-blue-600"></i>
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300">
                                    <i className="fab fa-twitter text-blue-400"></i>
                                </button>
                            </div>
                        </div>
                                            </div>
                                        ) : (
                                            <div id="register-form" className="form-container">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crea tu Cuenta</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-name">
                                    Nombre Completo
                                </label>
                                <div className="relative">
                                    <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                                    <input id="register-name" type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tu nombre completo" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-email">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                                    <input id="register-email" type="email" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="tu@email.com" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-password">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                                    <input id="register-password" type="password" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" />
                                    <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="register-confirm-password">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative">
                                    <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                                    <input id="register-confirm-password" type="password" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" />
                                    <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center mb-6">
                                <input id="terms" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    Acepto los <a href="#" className="text-blue-600 hover:text-blue-800">términos y condiciones</a>
                                </label>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                                Crear Cuenta
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">O regístrate con</p>
                            <div className="flex justify-center space-x-4 mt-3">
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300">
                                    <i className="fab fa-google text-red-500"></i>
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300">
                                    <i className="fab fa-facebook text-blue-600"></i>
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300">
                                    <i className="fab fa-twitter text-blue-400"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InicioRegistro;