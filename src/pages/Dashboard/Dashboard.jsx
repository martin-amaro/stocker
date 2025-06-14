import React from 'react'
import { Panel } from '../../components/dashboard/Panel';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {  MessageSquareWarning, TriangleAlert } from 'lucide-react';
import { hasRole } from '../../utils/roleUtils';
import { ROLES } from '../../constants/roles';


export const Dashboard = () => {

    const { user, setUser, login } = useAuth();
    const location = useLocation();

    return (
        <div className="bg-white text-gray-800">

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] middle:h-screen">

                <Panel />

                <main className="mt-14 middle:mt-0 overflow-y-auto relative">
                    {hasRole(user, ROLES.ADMIN) && !user.business?.name && location.pathname !== '/dashboard/business' && (
                        <div className='w-full p-4 bg-yellow-50 text-tiny font-medium text-neutral-900 flex justify-between items-center'>
                            <div className='gap-3 flex items-center'>
                                <TriangleAlert />
                                Aún no has completado los datos de tu negocio.
                            </div>
                            <div>
                                <Link to="/dashboard/business" className='btn-secondary border border-gray-600'>Completar</Link>
                            </div>
                        </div>
                    )}
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
