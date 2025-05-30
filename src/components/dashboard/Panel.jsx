import React from 'react';
import { ChartNoAxesCombined, House, IdCard, ReceiptText, Search, Settings, Tag, UsersRound } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const PanelItem = ({ icon, label, active = false }) => {
    return (
        <a href="#" className={"flex items-center gap-3 px-3 py-2 rounded-lg font-medium font-app text-tiny text-black " +
            (active ? "bg-blue-100 text-blue-700 " : "hover:bg-gray-100")}>
            <span>{icon}</span>
            {label}
        </a>
    );
}

export const Panel = () => {
    const location = useLocation();
    return (
        <aside className="w-64 bg-[#fafafa] border-r border-[#ededed] p-4 space-y-4">
            <Link className="w-full h-8 flex items-center justify-center mt-4 mb-6" to="/">
                <img src="logo.svg" alt="" />
            </Link>
            <div className='w-full mb-6'>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full max-w-sm dashboard-search" >
                    
                    <Search className="w-4 h-4 text-gray-700" />
                    <input
                        type="text"
                        spellCheck="false"
                        placeholder="Buscar"
                        // value={query}
                        // onChange={(e) => setQuery(e.target.value)}
                        // onKeyDown={handleKeyDown}
                        className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-500"
                    />
                </div>
            </div>
            <nav className="space-y-2">

                <PanelItem
                    icon={<House className='w-5 h-5' />}
                    label="Inicio"
                    active={location.pathname === '/dashboard'}
                />

                <PanelItem
                    icon={<ReceiptText className='w-5 h-5' />}
                    label="Artículos y servicios"
                />

                <PanelItem
                    icon={<Tag className='w-5 h-5' />}
                    label="Pagos y facturas"
                />

                <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">🌐 En línea</a>

                <PanelItem
                    icon={<IdCard className='w-5 h-5' />}
                    label="Clientes"
                />

                <PanelItem
                    icon={<ChartNoAxesCombined className='w-5 h-5' />}
                    label="Informes"
                />

                <PanelItem
                    icon={<UsersRound className='w-5 h-5' />}
                    label="Personal"
                />

                <PanelItem
                    icon={<Settings className='w-5 h-5' />}
                    label="Ajustes"
                />

            </nav>
        </aside>
    )
}
