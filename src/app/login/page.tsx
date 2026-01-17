"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const obtenerFuerzaContrasena = (password: string) => {
  if (!password) return { label: "", color: "bg-gray-200", width: "0%" };
  if (password.length < 6) return { label: "Muy débil", color: "bg-red-500", width: "25%" };
  if (password.length < 8) return { label: "Débil", color: "bg-orange-500", width: "50%" };
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { label: "Fuerte", color: "bg-green-500", width: "100%" };
  return { label: "Media", color: "bg-yellow-500", width: "75%" };
};


export default function LoginPage() {
    const [esRegistro, setEsRegistro] = useState(false);
    const [mostrarVerificacion, setMostrarVerificacion] = useState(false); // <--- Controla la vista de código
    const [codigo, setCodigo] = useState(""); // <--- Guarda los 6 dígitos
    const [correoParaVerificar, setCorreoParaVerificar] = useState(""); // <--- Guarda el correo que se registró
    const [password, setPassword] = useState("");
    const fuerza = obtenerFuerzaContrasena(password);
    const router = useRouter();

    //funcion para envuiar los datos a la base de datos
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (esRegistro && password.length < 8) {
            alert("La contraseña debe tener al menos 8 caracteres.");
            return;
        }
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        
        setCorreoParaVerificar(data.correo as string);

        // --- CAMBIO AQUÍ: Definir la URL de NestJS ---
        const baseUrl = 'http://localhost:3001'; 
        const endpoint = esRegistro 
            ? `${baseUrl}/api/auth/register` 
            : `${baseUrl}/api/auth/login`;

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            // Si el servidor envía un error HTML (como el que tenías antes), 
            // esto atrapará el fallo antes de intentar leer el JSON
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const resultado = await res.json();
            alert(resultado.message);
            
            if (esRegistro) {
                setMostrarVerificacion(true); // <--- ACTIVAMOS LA PANTALLA DE CÓDIGO
            } else {
                router.push('/');
            }

        } catch (error: any) {
            console.error("Error al conectar:", error);
            alert(error.message || "Hubo un fallo en la conexión");
        }
    };




    const handleVerificarCodigo = async () => {
        if (codigo.length < 6) {
            alert("El código debe tener 6 dígitos");
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    correo: correoParaVerificar, 
                    codigo: codigo 
                }),
            });

            const resultado = await res.json();
            if (!res.ok) throw new Error(resultado.message);

            alert("¡Cuenta verificada con éxito! Ya puedes iniciar sesión.");
            setMostrarVerificacion(false);
            setEsRegistro(false); // Te manda al login
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            {/* Botón para volver (Siempre visible) */}
            <div className="w-full max-w-[400px] mb-4">
                <Link href="/" className="text-gray-400 hover:text-black transition-colors font-medium">
                    <i className="fas fa-arrow-left mr-2"></i> Volver
                </Link>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="w-full max-w-[400px] flex flex-col items-center px-6 py-6 border-2 border-red-800 bg-gray-200 shadow-xl rounded-sm">
                
                {/* Logo */}
                <div className="bg-[#e60014] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl italic mb-6">
                    r
                </div>

                {mostrarVerificacion ? (
                    /* --- VISTA A: VERIFICACIÓN (Solo se ve tras registrarse) --- */
                    <div className="w-full animate-in fade-in zoom-in duration-300">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-tight">
                                Verifica tu cuenta
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Introduce el código enviado a:<br/>
                                <span className="font-bold text-black">{correoParaVerificar}</span>
                            </p>
                        </div>

                        <div className="space-y-6">
                            <input 
                                type="text"
                                maxLength={6}
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                                className="w-full border-b-2 border-red-800 py-3 text-center text-3xl font-mono font-bold tracking-[10px] text-black bg-white/50 outline-none focus:border-black transition-all" 
                                placeholder="000000"
                            />
                            <button 
                                onClick={handleVerificarCodigo}
                                className="w-full bg-[#e60014] text-white font-bold py-4 uppercase tracking-widest hover:bg-black transition-all cursor-pointer shadow-md"
                            >
                                Confirmar Código
                            </button>
                        </div>
                    </div>
                ) : (
                    /* --- VISTA B: LOGIN / REGISTRO (Vista por defecto) --- */
                    <div className="w-full animate-in fade-in duration-300">
                        <div className="text-center mb-4">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2 uppercase tracking-tight">
                                {esRegistro ? "Crea tu cuenta" : "¡Hola!"}
                            </h1>
                            <p className="text-gray-500 text-sm">
                                {esRegistro ? "Es rápido y fácil." : "Ingresa tus datos para acceder."}
                            </p>
                        </div>

                        <form className="w-full space-y-5" onSubmit={handleSubmit}>
                            {esRegistro && (
                                <div>
                                    <label className="text-[11px] font-bold uppercase text-black block mb-1">Nombre Completo</label>
                                    <input 
                                        name="nombre"
                                        type="text" 
                                        className="w-full border-b-2 border-gray-300 py-2 px-3 outline-none focus:border-black text-black bg-white/50 transition-all" 
                                        placeholder="Ej: Juan Pérez"
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label className="text-[11px] font-bold uppercase text-black block mb-1">E-mail</label>
                                <input 
                                    name="correo"
                                    type="email" 
                                    className="w-full border-b-2 border-gray-300 py-2 px-3 outline-none focus:border-black text-black bg-white/50 transition-all" 
                                    placeholder="tuemail@dominio.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-bold uppercase text-black block mb-1">Contraseña</label>
                                <input 
                                    name="contrasena"
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border-b-2 border-gray-200 py-2 px-3 outline-none focus:border-black text-black bg-white/50 transition-all" 
                                    placeholder="********"
                                    required
                                />
                                {esRegistro && password && (
                                    <div className="mt-2 w-full">
                                        <div className="flex justify-between mb-1 text-[10px] font-bold uppercase">
                                            <span>Seguridad: {fuerza.label}</span>
                                            <span>{password.length} carac.</span>
                                        </div>
                                        <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden">
                                            <div className={`${fuerza.color} h-full transition-all duration-500`} style={{ width: fuerza.width }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="w-full bg-[#e60014] text-white font-bold py-4 uppercase tracking-widest hover:bg-black transition-all cursor-pointer shadow-md">
                                {esRegistro ? "Registrarme" : "Entrar"}
                            </button>
                        </form>

                        <div className="mt-4 text-center border-t border-gray-500 pt-2 w-full">
                            <p className="text-sm text-black">
                                {esRegistro ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}
                            </p>
                            <button 
                                onClick={() => setEsRegistro(!esRegistro)}
                                className="text-sm text-black font-bold mt-2 hover:underline cursor-pointer"
                            >
                                {esRegistro ? "Inicia sesión aquí" : "Crear mi cuenta ahora"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}