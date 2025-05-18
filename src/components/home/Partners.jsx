import React, { useEffect, useRef } from 'react'
import { Img } from '../Img.jsx'

export const Partners = () => {

    const marqueeRef = useRef(null);
    const partners = [
        'procinal.png',
        'cesde.png',
        'comfama.png',
        'tierragro.png',
        'uda.png',
        'platzi.png',
        'postobon.png',
      ]

    useEffect(()=> {
        const root = document.documentElement;
        const marqueeContent = marqueeRef.current;

        const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");

        root.style.setProperty("--marquee-elements", marqueeContent.children.length);

        for (let i = 0; i < Number(marqueeElementsDisplayed); i++) {
            marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        }
    }, []);

    return (
        <section className="bg-white w-full h-[200px] flex justify-center items-center">
  <div
    className="relative overflow-hidden text-[#eee]"
    style={{ width: 'var(--marquee-width)', height: 'var(--marquee-height)' }}
  >
    {/* Gradients (before/after) */}
    <div className="pointer-events-none absolute top-0 left-0 w-40 h-full z-10 bg-gradient-to-r from-white to-transparent" />
    <div className="pointer-events-none absolute top-0 right-0 w-40 h-full z-10 bg-gradient-to-l from-white to-transparent" />

    <ul
      ref={marqueeRef}
      className="list-none h-full flex animate-scrolling"
      style={{ gap: 'var(--marquee-gap)' }}
    >
      {partners.map((name, i) => (
        <li
          key={i}
          className="flex justify-center items-center shrink-0 whitespace-nowrap"
          style={{
            width: 'var(--marquee-element-width)',
            fontSize: 'calc(var(--marquee-height)*3/4)',
            maxHeight: '100%',
          }}
        >
          <Img
            src={`images/partners/${name}`}
            className="w-full h-full object-scale-down grayscale"
          />
        </li>
      ))}
    </ul>
  </div>
</section>

    )
}
