import React from 'react'
import introVideo from '../../assets/videos/intro2.mp4'

export const Hero = () => {
    return (
        <div className="flex flex-col w-full relative overflow-hidden sm:flex-row sm:h-[70vh]">
            <div className="hidden sm:block absolute inset-0 bg-black/70 z-[1]"></div>
            <div className="hidden sm:block absolute bottom-0 left-0 w-full h-10  z-[1]"></div>

            <div className="flex w-full h-full p-4 sm:p-0 z-0 order-1 overflow-hidden sm:absolute">
                <video
                    className="rounded-[10px] w-full h-full object-cover sm:rounded-none sm:m-0"
                    src={introVideo}
                    poster="images/hero.png"
                    autoPlay
                    loop
                    muted
                />

            </div>

            <div className="relative p-8 rounded-md z-[2] order-0 text-black sm:my-auto sm:text-[#f0eded] lg:mx-24 lg:w-[40%]">
                <h2 className="uppercase mb-4 text-2xl sm:text-5xl font-bold leading-tight">
                    Optimiza tu Inventario,<br />
                    Maximiza tu <span className="text-[#6559ff]">Negocio</span>
                </h2>
                <p className="text-[1.12rem]">Gestión de stock eficiente, precisa y en tiempo real.</p>
                <div className='flex gap-4'>
                    <button className="btn-main"> Regístrate gratis </button>
                </div>
            </div>
        </div>
    )
}
