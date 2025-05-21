import React from 'react'

export const Heroless = () => {
    return (
        <section className="container mx-auto my-8 bg-white ">

            {/* Section */}
            <div className='py-16 px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-10'>
                <div className="lg:w-1/2">
                    <h2 className="section-title mb-6 leading-tight">
                        Automatiza y controla sin complicaciones<br />
                    </h2>
                    <p className="text-gray-700 mb-4 text-lg">
                        Control total sobre cada producto: conoce el stock disponible, el precio de venta, el código de barras y más — todo desde una única vista.
                    </p>
                    <p className="text-gray-700 text-lg">
                        Desde tareas diarias hasta reportes críticos, Stocker automatiza flujos, centraliza la información y te entrega el control en la palma de la mano. Todo sincronizado, accesible y personalizable según tu operación.
                    </p>
                </div>
                <div className="lg:w-1/2 relative">
                    <img src="https://www.inflowinventory.com/wp-content/uploads/2024/09/inflow-inventory-easy-to-use.png" alt="Tablet inspecting engine" className="rounded-xl " />
                </div>
            </div>

            <div className='py-16 px-6 lg:px-20 flex flex-col-reverse lg:flex-row-reverse items-center gap-10'>
                <div className="lg:w-1/2">
                    <h2 className="section-title mb-6 leading-tight">
                        Resultados visibles<br/>desde el primer día
                    </h2>
                    <p className="text-gray-700 mb-4 text-lg">
                        Ahorra tiempo, reduce pérdidas y toma decisiones basadas en datos reales. Empresas como Tostao ya mejoraron su eficiencia operativa y ahora tú también puedes lograrlo.
                    </p>
                   
                </div>
                <div className="lg:w-1/2 relative">
                    <img src="https://plus.unsplash.com/premium_photo-1661609098718-3408828713ba?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RvY2slMjBjaGFydHN8ZW58MHx8MHx8fDA%3D" alt="Tablet inspecting engine" className="rounded-xl " />
                </div>
            </div>

        </section>

    )
}
