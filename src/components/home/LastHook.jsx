import { ArrowDownWideNarrow, Rocket, ShieldCheck, Smartphone, Zap } from 'lucide-react'
import React from 'react'

export const LastHook = () => {
    return (
        <section className="bg-[#000] text-white py-32 text-center">
            <h2 className="text-3xl md:text-5xl mb-12 font-bold font-display">
                Impulsa la eficiencia en tu inventario
                <br/>
                con <span className='text-primary'>Stocker</span>.
            </h2>

            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto mb-10">
                <div className="flex items-center gap-2">
                    <Smartphone className='w-6 h-6' />
                    <span>Digitaliza tus procesos</span>
                </div>
                <div className="flex items-center gap-2">
                    <Rocket />
                    <span>Aumenta la productividad del equipo</span>
                </div>
                <div className="flex items-center gap-2">
                    <ArrowDownWideNarrow />
                    <span>Reduce pérdidas y errores</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap />
                    <span>Agiliza la recepción y despacho</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck />
                    <span>Disminuye riesgos operativos</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button className='btn-main m-0! px-6!'>Comenzar gratis</button>
                <button className='btn-sec m-0! px-6!'>Solicitar demo</button>
            </div>

            <div className="flex justify-center gap-4">
                <a href="#">
                    <img
                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                        alt="App Store"
                        className="h-10"
                    />
                </a>
                <a href="#">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Google Play"
                        className="h-10"
                    />
                </a>
                
            </div>
        </section>
    )
}
