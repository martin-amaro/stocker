import React, { forwardRef, useEffect, useRef } from 'react'
import gsap from 'gsap'

const Item = ({ title, src }, ref) => (
    <a
        ref={ref}
        href='#'
        className='relative h-[564px] rounded-2xl overflow-hidden group will-change-transform'
    >
        <div className='size-full'>
            <img src={src} alt="" className='group-hover:scale-125 transition size-full object-cover' />
        </div>
        <div className='group-hover:opacity-0 flex items-end justify-center transition duration-200 absolute size-full left-0 top-0 bg-gradient-to-b from-transparent to-black'>
            <h3 className='mb-8 font-bold font-app text-gray-300 text-2xl'>{title}</h3>
        </div>
    </a>
)

const ForwardedItem = forwardRef(Item)

export const Categories = () => {
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);
    const lastScrollY = useRef(window.scrollY);
// Inicializar posición acumulada para cada ítem
const positions = useRef([])

useEffect(() => {
    const handleScroll = () => {
        const currentY = window.scrollY
        const delta = currentY - lastScrollY.current
        lastScrollY.current = currentY

        const section = sectionRef.current
        const rect = section.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (!inView) return

        // Inicializar posiciones si es la primera vez
        if (positions.current.length === 0) {
            positions.current = itemsRef.current.map(() => 0)
        }

        // Acumular el desplazamiento
        positions.current = positions.current.map(pos => pos - delta * 0.1)

        // Aplicar nueva posición absoluta a cada ítem
        itemsRef.current.forEach((el, i) => {
            gsap.to(el, {
                x: positions.current[i],
                duration: 0.5,
                ease: 'power2.out',
            })
        })
    }

    const start = () => {
        window.addEventListener('scroll', handleScroll)
    }

    requestAnimationFrame(() => setTimeout(start, 50))

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
}, [])


    return (
        <section
            ref={sectionRef}
            className='grid grid-cols-4 p-8 gap-4 overflow-hidden'
        >
            {[
                { title: "Construcción", src: "images/features/6.jpg" },
                { title: "Belleza", src: "images/features/2.jpg" },
                { title: "Retail", src: "images/features/3.jpg" },
                { title: "Logística", src: "images/features/5.jpg" },
            ].map((item, i) => (
                <ForwardedItem
                    key={i}
                    {...item}
                    ref={el => (itemsRef.current[i] = el)}
                />
            ))}
        </section>
    )
}
