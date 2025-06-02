import React from 'react'
import { Panel } from '../../components/dashboard/Panel';
import { Outlet } from 'react-router-dom';


export const Dashboard = () => {
    
    return (
        <div className="bg-white text-gray-800">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] middle:h-screen">

                <Panel />

                <main className="mt-14 middle:mt-0 overflow-y-auto relative">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
