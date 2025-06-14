import React, { useEffect, useState } from 'react';
import { Badge } from '../Badge';

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Primer item activo por defecto
    const toggleFAQ = (index) => {
        setActiveIndex(prev => prev === index ? null : index);
    };
    const [preguntas, setPreguntas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPreguntas() {
            const response = await fetch('/stocker/preguntas.json');
            const data = await response.json();
            setPreguntas(data);
        }
        fetchPreguntas();
    }, []);

    return (
        <section className="my-24 mx-auto max-w-limit">
            <div className="w-full flex flex-col items-center justify-center my-12 ">
                <Badge text="Preguntas Frecuentes"/>
                <h2 className='section-title text-center'>Todo lo que necesitas saber</h2>
            </div>
            <div className="flex flex-col w-full mx-auto px-3 lg:flex-row lg:w-[90%] lg:p-8 gap-8 lg:gap-0">
                <div className="w-full overflow-hidden lg:w-[40%]">
                    <img
                        src="images/faq.jpg"
                        alt=""
                        className="rounded-lg w-full h-[180px] object-cover lg:object-none lg:h-auto lg:w-auto"
                    />
                </div>
                <div className="flex flex-col items-center gap-[10px] w-full px-0 md:px-20 lg:w-[60%]">
                    {error && <p className="text-red-500">{error}</p>}
                    {preguntas.length === 0 && !error && (
                        <p className="text-neutral-500">No hay preguntas disponibles.</p>
                    )}
                    {preguntas.map((pregunta, idx) => (
                        <div className="faq-item w-full select-none" key={idx}>
                            <button
                                className={`faq-title w-full flex justify-between items-center text-left gap-2 px-5 py-3 text-lg lg:text-lg bg-white text-neutral-700 transition-all cursor-pointer`}
                                onClick={() => toggleFAQ(idx)}
                            >
                                <span className='flex-1'>{pregunta.pregunta}</span>
                                <svg className="fal w-7 h-7 shrink-0 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#303030">
                                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>
                            </button>
                            <div className={`faq-content grid transition-[grid-template-rows] duration-300 ease-in-out px-6 border-t border-t-[#878787] ${activeIndex === idx ? 'active' : ''}`}>
                                <div className="faq-content__ov overflow-hidden">
                                    <p className='text-neutral-500 my-4 text-base md:text-md leading-snug'>{pregunta.respuesta}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};