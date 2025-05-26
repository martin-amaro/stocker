import React, { useState } from 'react'
import { Header } from '../components/Header'
import config from '../config'
import { CircleX } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


export const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState({});

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

    const handleSubmit = (e) => {
        if (validateForm()) {
            // Aquí puedes continuar con el registro
            console.log('Formulario válido. Enviar datos...');
            handleLogin(e);
        } else {
            console.log('Formulario inválido. Mostrar errores...');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

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
            console.error(error.response ? error.response.data : error.message);
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
        <div className='min-h-screen'>
            <Header />

            <div className='flex items-center justify-center max-w-[1680px] mx-auto overflow-hidden' style={{ height: 'calc(100vh - 64px)' }}>
                <div className='w-[50%] h-full flex flex-col items-center justify-center '>



                    <div className='w-8/12'>
                        <div className="flex text-center mb-8">
                            <img src="stocker.svg" alt="logo" className="w-10 inline-block" />
                        </div>
                        <div className='text-left mb-8 max-w-lg'>
                            <h1 className='text-4xl font-bold font-display text-neutral-900 mb-2'>Vamos a crear tu cuenta</h1>
                            <p className='text-neutral-800'>Registrarse en {config.appName} es rápido y gratis, sin compromisos ni contratos a largo plazo.</p>
                        </div>

                        <div className="max-w-lg w-full">


                            <form>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-slate-800 text-sm font-medium mb-2 block">Correo electrónico</label>
                                        <input name="email" type="text" onChange={handleChangeEmail} className="text-slate-800 bg-white border border-slate-300 w-full text-base px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                                        <ErrorMessage message={errors.email} />
                                    </div>
                                    <div>
                                        <label className="text-slate-800 text-sm font-medium mb-2 block">Contraseña</label>
                                        <input name="password" type="password" onChange={handleChangePassword} className="text-slate-800 bg-white border border-slate-300 w-full text-base px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
                                        <ErrorMessage message={errors.password} />

                                    </div>
                                    <div>
                                        <label className="text-slate-800 text-sm font-medium mb-2 block">Confirmar contraseña</label>
                                        <input name="cpassword" type="password" onChange={handleChangeRepassword} className="text-slate-800 bg-white border border-slate-300 w-full text-base px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password" />
                                        <ErrorMessage message={errors.repassword} />

                                    </div>

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

                                <div className="mt-12">
                                    {/* <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                        Crear cuenta
                                    </button> */}
                                    <button
                                        type='button'
                                        onClick={handleSubmit}
                                        className='btn-main w-full my-0!'>
                                        Crear una cuenta
                                    </button>
                                </div>
                                <p className="text-slate-800 text-base mt-6 text-center">¿Ya tienes una cuenta? <a href="#" className="text-blue-600 font-medium hover:underline ml-1">Inicia sesión</a></p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='w-[50%] h-full'>
                    <video className='h-full w-full object-cover' autoPlay muted loop src="https://videos.ctfassets.net/2d5q1td6cyxq/4YulblW0Kwb9NP7XyXlj4C/9be9a22ffd1e868409dce27f6a2031fc/PD06867_-_auto_video_15_cut_mobile.mp4"></video>
                </div>
            </div>
        </div>
    )
}
