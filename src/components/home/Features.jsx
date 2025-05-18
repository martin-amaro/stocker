import React from 'react'
import { Img } from '../Img'

export const Features = () => {
    return (
        <section className="feature-section">
            <div className="feature-section__info">
                <h2>Todo tu trabajo<br/>en un solo lugar</h2>
                <p>Digitalice cada elemento de su operación y encuentre áreas de mejora en cada paso del camino.</p>
                <button className="btn-main">Explora la plataforma</button>
            </div>
            <div className="feature-section__img">
                <Img src="images/app-dashboard.webp" alt=""/>
            </div>
        </section>
    )
}
