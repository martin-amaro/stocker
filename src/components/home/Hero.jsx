import React from 'react'
import introVideo from '../../assets/videos/intro2.mp4'
import reactLogo from '../../assets/react.svg'

export const Hero = () => {
    return (
        <div className="hero-section">
            <div className="image-container">
                    <video className="parallax" src={introVideo} poster="assets/images/hero.png" autoPlay loop muted></video>

            </div>
            <div className="info_container">
                <h2 className="info_container__title">Optimiza tu Inventario,<br/>Maximiza tu <span>Negocio</span></h2>
                <p className="info_container__desc">Gestión de stock eficiente, precisa y en tiempo real. </p>
                <button className="btn-main">Regístrate gratis</button>
            </div>
        </div>
    )
}
