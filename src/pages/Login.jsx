import React, { useState } from 'react'
import { Header } from '../components/Header'
import config from '../config'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { AuthError } from './../components/auth/AuthError';
import { AuthInput } from './../components/auth/AuthInput';


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);



    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setServerError('');
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setServerError('');
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setServerError(null);

        try {
            const response = await axios.post("http://localhost:8080/users", {
                email,
                password,
            });

            if (response.status === 201) {
                // Si se creó exitosamente, logueamos
                const loginResponse = await axios.post("http://localhost:8080/auth", {
                    username: email,
                    password: password
                });


                const token = loginResponse.data.token;

                // Guardar el token
                localStorage.setItem("token", token);

                // Redirigir
                login(token);
                navigate("/");
            }

        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                if (status === 401) {
                    setServerError("Correo o contraseña incorrectos.");
                } else if (status === 400) {
                    setServerError(data.message || "Solicitud incorrecta. Verifica los datos.");
                } else if (status === 500) {
                    setServerError("Error interno del servidor. Intenta más tarde.");
                } else {
                    setServerError(data.message || "Ocurrió un error al iniciar sesión.");
                }
            } else if (error.request) {
                setServerError("No se recibió respuesta del servidor. Verifica tu conexión.");
            } else {
                setServerError("Error inesperado: " + error.message);
            }
        }
        finally {
            setLoading(false);
        }
        
    }

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El formato del correo no es válido.';
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // true si no hay errores
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Header simple={true} />

            <div className='flex-grow flex items-center justify-center max-w-[1680px] mx-auto w-full' >
                <div className='w-[50%] h-full flex flex-col items-center justify-center '>



                    <div className='w-8/12'>
                        <div className="flex text-center mb-8">
                            <img src="stocker.svg" alt="logo" className="w-10 inline-block" />
                        </div>
                        <div className='text-left mb-8 max-w-lg'>
                            <h1 className='text-4xl font-bold font-display text-neutral-900 mb-2'>Inicia sesión</h1>
                            <p className='text-neutral-800'>¿Nuevo en {config.appName}?</p>
                        </div>

                        <div className="max-w-lg w-full">


                            <form>
                                <div className="space-y-6">
                                    <AuthInput
                                        label="Correo electrónico"
                                        name="email"
                                        type="text"
                                        action={handleChangeEmail}
                                        disabled={loading}
                                        placeholder="Enter email"
                                        error={errors.email}
                                    />

                                    <AuthInput
                                        label="Contraseña"
                                        name="password"
                                        type="password"
                                        action={handleChangePassword}
                                        disabled={loading}
                                        placeholder="Enter password"
                                        error={errors.password}
                                    />
                                    
                                </div>

                                {serverError && <AuthError message={serverError} />}

                                <div className="mt-12">
                                    <button
                                        type='button'
                                        onClick={handleLogin}
                                        disabled={loading}
                                        className='btn-main w-full my-0!'>
                                        Continuar
                                    </button>
                                </div>
                                <p className="text-slate-800 text-base mt-6 text-center">¿Ya tienes una cuenta? <a href="#" className="text-blue-600 font-medium hover:underline ml-1">Inicia sesión</a></p>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
