import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { CircleUserRound, GraduationCap, MessageCircleQuestion } from 'lucide-react';
import image from '../assets/images/logo.svg';
import { MenuBurger } from './MenuBurger';

export const HeaderAuth = ({ simple = false }) => {
    const { user, logout } = useAuth();
    
    return (
        <header className="w-full bg-white border-b py-2 lg:py-0  border-gray-300">
            <div className="w-full mx-auto flex justify-between items-center px-3 py-2 md:px-12 max-w-[1900px]">
                <div className="flex items-center gap-10">

                    {/* Logo */}
                    <div>
                        <Link to="/">
                            {/* <svg className="LogoLockup svelte-1qhoav6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3967.7 995.7" width="88" height="22"><path d="M828.4,0H166.2C74.4,0,0,74.4,0,166.2v662.2c0,91.8,74.4,166.2,166.2,166.2h662.2 c91.8,0,166.2-74.4,166.2-166.2V166.2C994.6,74.4,920.2,0,828.4,0z M813.8,761.3c0,29-23.5,52.5-52.5,52.5h-528 c-29,0-52.5-23.5-52.5-52.5v-528c0-29,23.5-52.5,52.5-52.5h528c29,0,52.5,23.5,52.5,52.5V761.3z M391.8,632.3 c-16.7,0-30.1-13.5-30.1-30.2V391.3c0-16.7,13.4-30.3,30.1-30.3h211.1c16.6,0,30.1,13.5,30.1,30.3V602c0,16.7-13.5,30.2-30.1,30.2 H391.8z M1258.3,617.9h108.6c5.4,61.5,47.1,109.5,131.2,109.5c75.1,0,121.3-37.1,121.3-93.2c0-52.5-36.2-76-101.4-91.4l-84.2-18.1 c-91.4-19.9-160.2-78.7-160.2-174.7c0-105.9,94.1-178.3,216.3-178.3c129.4,0,212.7,67.9,219.9,168.3h-105 C1592.3,293,1553.3,265,1490,265c-67,0-113.1,36.2-113.1,82.4s39.8,74.2,108.6,89.6l83.3,18.1c91.4,19.9,153.8,75.1,153.8,171.9 c0,123.1-92.3,196.4-224.4,196.4C1349.7,823.3,1267.4,742.8,1258.3,617.9z M2111.1,994.6V814.5l7.1-79h-7.1 c-24.9,56.8-77.2,87.9-148.2,87.9c-114.5,0-199.7-93.2-199.7-236.1c0-142.9,85.2-236.1,199.7-236.1c70.1,0,119.8,32.8,148.2,84.3 h7.1V360h94.1v634.6H2111.1z M2114.6,587.2c0-91.4-55.9-144.7-124.3-144.7s-124.3,53.3-124.3,144.7c0,91.4,55.9,144.7,124.3,144.7 S2114.6,678.7,2114.6,587.2z M2287.4,634.3V360h101.2v265.4c0,71.9,34.6,106.5,92.3,106.5c71,0,117.2-50.6,117.2-129.6V360h101.2 v454.4h-94.1v-94.1h-7.1c-22.2,60.4-71,103-146.4,103C2343.3,823.3,2287.4,754.1,2287.4,634.3z M2760.9,687.5 c0-85.2,59.5-134.9,165.1-141.1l125.1-8v-35.5c0-42.6-31.1-68.3-86.1-68.3c-50.6,0-80.8,25.7-88.8,62.1h-101.2 c10.7-92.3,87-145.6,189.9-145.6c116.3,0,187.3,49.7,187.3,145.6v317.7h-94.1v-84.3h-7.1c-21.3,55.9-65.7,93.2-150.9,93.2 C2818.6,823.3,2760.9,768.3,2760.9,687.5z M3051.2,631.6v-24l-102.1,7.1c-55,3.5-79.9,24-79.9,64.8c0,34.6,28.4,59.5,68.3,59.5 C3009.5,739,3051.2,692.9,3051.2,631.6z M3227.7,814.5V360h94.1v87h7.1c13.3-59.5,58.6-87,126-87h46.2v91.4h-57.7 c-65.7,0-114.5,42.6-114.5,123.4v239.6H3227.7z M3964.1,605.9h-345.3c5.3,83.4,63.9,130.5,128.7,130.5c55,0,89.6-22.2,109.2-59.5 H3957c-27.5,92.3-108.3,146.4-210.4,146.4c-134,0-228.1-100.3-228.1-236.1c0-135.8,96.7-236.1,229-236.1 c133.1,0,220.1,91.4,220.1,205C3967.7,578.4,3965.9,589.9,3964.1,605.9z M3867.4,535.8c-3.5-63-55.9-105.6-119.8-105.6 c-60.4,0-110.9,38.2-123.4,105.6H3867.4z" fill="black" className="svelte-1qhoav6"></path> </svg> */}
                            <img src={image} className='w-26' alt="" />
                        </Link>
                    </div>

                    {/* Nav Menu Desktop */}
                    {!simple && (
                        <nav className="hidden lg:block">
                            <ul className='flex gap-4 font-medium text-gray-300'>
                                <li> <a className="header-link" href="#" >Inicio</a> </li>
                                <li> <a className="header-link" href="#" >Inventario</a> </li>
                                <li> <a className="header-link" href="#" >Productos</a> </li>
                                <li> <a className="header-link" href="#" >Personal</a> </li>
                                <li> <a className="header-link" href="#" >Planes</a> </li>
                            </ul>
                        </nav>
                    )}

                </div>

                {/* Botones de acción Desktop */}
                <div className={!simple ? "hidden lg:block" : ""}>
                    <ul className='flex items-center gap-3'>
                        {!simple ? (
                            <>
                                <li>
                                    <button className="header-link flex gap-2 cursor-pointer" onClick={logout}>
                                        <CircleUserRound />
                                        Logout
                                    </button>
                                </li>
                                <li>
                                    <a className="header-link flex gap-2" href="#">
                                        <MessageCircleQuestion />
                                        Soporte
                                    </a>
                                </li>
                            </>

                        ) : (
                            <>
                                <li>
                                    <Link className="header-link flex gap-2" to="/login">
                                        <GraduationCap />
                                        Aprende más
                                    </Link>
                                </li>
                            </>
                        )}


                    </ul>
                </div>


                {/* Nav Menu Mobile */}
                {!simple && (
                    <>

                        <MenuBurger nav='mt-20'>
                            <ul className="w-full flex flex-col text-base font-medium text-gray-800">
                                <li><a href="#" className="header-mobile-link">Rutas de Aprendizaje</a></li>
                                <li><a href="#" className="header-mobile-link">Certificaciones</a></li>
                                <li><a href="#" className="header-mobile-link">Mentores</a></li>
                                <li><a href="#" className="header-mobile-link">Blog</a></li>
                                <li><a href="#" className="header-mobile-link">Ingresar</a></li>
                                <li><a href="#" className="header-mobile-link">Comienza Ahora</a></li>
                            </ul>
                        </MenuBurger>
                    </>
                )}

            </div>
        </header>
    )
}
