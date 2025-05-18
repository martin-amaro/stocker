import React, { useEffect, useRef } from 'react'
import { Img } from '../Img.jsx'

export const Partners = () => {

    const marqueeRef = useRef(null);

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
        <section className="partner-section">
            <div className="partner-gallery">
                <ul className="partner-gallery__content" ref={marqueeRef}>
                    <li> <Img src="images/partners/procinal.png" /> </li>
                    <li> <Img src="images/partners/cesde.png" /> </li>
                    <li> <Img src="images/partners/comfama.png" /> </li>
                    <li> <Img src="images/partners/tierragro.png" /> </li>
                    <li> <Img src="images/partners/uda.png" /> </li>
                    <li> <Img src="images/partners/platzi.png" /> </li>
                    <li> <Img src="images/partners/postobon.png" /> </li>
                </ul>
            </div>
        </section>
    )
}
