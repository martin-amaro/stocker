import React from 'react'
import { Panel } from '../../components/dashboard/Panel';
import { Outlet } from 'react-router-dom';


export const Dashboard = () => {
    
    return (
        <div className="bg-white text-gray-800">

            <div className="flex h-screen">

                <Panel />

                <main className="flex-1 overflow-y-auto relative">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
