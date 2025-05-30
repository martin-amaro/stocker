import React, { useState } from 'react'
import { Header } from '../components/Header'
import config from '../config'
import { CircleX, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { AuthInput } from '../components/auth/AuthInput';
import { AuthError } from './../components/auth/AuthError';


export const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeRepassword = (e) => {
        setRepassword(e.target.value);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Registrar usuario
            const registerResponse = await axios.post("http://localhost:8080/auth/register", {
                email,
                password,
            });

            if (registerResponse.status === 201) {
                // Si el registro fue exitoso, hacemos login
                const loginResponse = await axios.post("http://localhost:8080/auth/login", {
                    email,
                    password,
                });

                const token = loginResponse.data.token;
                localStorage.setItem("token", token);

                login(token); // función para actualizar estado global (por props)
                navigate("/");
            }
        } catch (err) {
            if (err.response) {
                // Error de backend
                if (err.response.status === 409) {
                    setError("Este correo ya está registrado.");
                } else {
                    setError(err.response.data || "Error en el servidor.");
                }
            } else {
                // Error de red u otro
                setError("No se pudo conectar al servidor.");
            }
        } finally {
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

        if (!repassword) {
            newErrors.repassword = 'Debes confirmar la contraseña.';
        } else if (password !== repassword) {
            newErrors.repassword = 'Las contraseñas no coinciden.';
        }

        if (!terms) {
            newErrors.terms = 'Debes aceptar los términos y condiciones.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // true si no hay errores
    };




    const ErrorMessage = ({ message }) => {
        if (!message) return null;
        return (
            <div className="flex items-center text-red-600 text-sm mt-1 gap-2">
                <CircleX size={16} />
                <span>{message}</span>
            </div>
        );
    };



    return (
        <div className='min-h-screen flex flex-col'>
            <Header simple={true} />

            <div className='flex-1 flex mx-auto w-full' >

                <div className='flex-1 flex justify-center w-6/12 px-8 pt-12 pb-8 2xl:px-0'>
                    <div className='max-w-lg'>
                        <div className="flex text-center mb-8">
                            <img src="stocker.svg" alt="logo" className="w-10 inline-block" />
                        </div>
                        <div className='text-left mb-8'>
                            <h1 className='text-4xl font-bold font-display text-neutral-900 mb-2'>Vamos a crear tu cuenta</h1>
                            <p className='text-neutral-800'>Registrarse en {config.appName} es rápido y gratis, sin compromisos ni contratos a largo plazo.</p>

                        </div>

                        <div className="w-full">


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

                                    <AuthInput
                                        label="Repetir contraseña"
                                        name="repassword"
                                        type="password"
                                        action={handleChangeRepassword}
                                        disabled={loading}
                                        placeholder="Enter password"
                                        error={errors.repassword}
                                    />

                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={terms}
                                            onChange={(e) => setTerms(e.target.checked)}
                                            className="h-4 w-4 text-blue-600 border-slate-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="text-slate-800 ml-3 block text-sm">
                                            Acepto los <a href="#" className="text-blue-600 font-medium hover:underline ml-0.5">Términos y Condiciones</a>
                                        </label>
                                    </div>
                                    <ErrorMessage message={errors.terms} />

                                </div>

                                {serverError && <AuthError message={serverError} />}

                                <div className="mt-12">
                                    <button
                                        type='button'
                                        onClick={handleRegister}
                                        disabled={loading}
                                        className='btn-main w-full my-0! flex justify-center'>
                                        {loading ? <LoaderCircle className='animate-spin' /> : "Crear cuenta"}
                                    </button>
                                </div>
                                <p className="text-slate-800 text-base mt-6 text-center">¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 font-medium hover:underline ml-1">Inicia sesión</Link></p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="flex-1 hidden lg:flex w-1/2">
                    <img className='w-full m-auto h-full object-cover' src="https://cdn.prod.website-files.com/634f8a681508d6180f9a2128/659cddd0f20a20859890e10b_7%20Proven%20Techniques%20for%20Sucessfull%20Inventory%20Management.webp" alt="" />
                </div>


            </div>

        </div>
    )
}