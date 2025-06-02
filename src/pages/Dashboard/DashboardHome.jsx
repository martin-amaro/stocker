import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardHome = () => {
    return (
        <div className="">
            <h1 className="text-2xl font-semibold mb-4">Bienvenido/a otra vez.</h1>
            <p className="text-sm text-gray-500 mb-6">Configuraste un <strong>0%</strong>.</p>
            
            <Link to="/logout">Salir</Link >

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-[#f7f7f7] p-6 rounded-md">
                <div className="col-span-3 bg-white rounded-xl shadow p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Rendimiento</h2>
                        <span className="text-sm text-gray-500">Fecha: 29 de mayo</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div><strong>Ventas netas:</strong> $0.00</div>
                        <div><strong>Venta neta promedio:</strong> $0.00</div>
                        <div><strong>Ventas brutas:</strong> $0.00</div>
                        <div><strong>Devoluciones:</strong> $0.00</div>
                        <div><strong>Transacciones:</strong> 0</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-md font-semibold mb-3">Clientes</h2>
                    <ul className="text-sm space-y-1">
                        <li>Total de clientes: 0</li>
                        <li>Clientes frecuentes: 0</li>
                        <li>Promedio de visitas: 0</li>
                        <li>Consumo promedio por visita: $0.00</li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-md font-semibold mb-3">Formas de pago</h2>
                    <div className="h-3 w-full bg-gray-100 rounded mb-2">
                        <div className="bg-blue-500 h-3 rounded w-[0%]"></div>
                    </div>
                    <p className="text-sm">Tarjeta: $0.00 (0%)</p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-md font-semibold mb-3">Artículos</h2>
                    <p className="text-sm text-gray-500">Verás un desglose de tus ventas de artículos aquí una vez que comiences a vender artículos.</p>
                </div>
            </section>
        </div>
    )
}
