import React, { useState } from 'react';
import { ChartNoAxesCombined, House, IdCard, ReceiptText, Search, Settings, Tag, UsersRound } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import config from '../../config';

import { ProfileButton } from './ProfileButton';



const PanelItem = ({ icon, label, active = false , path=false}) => {
    return (
        <Link to={path || "#"} className={"flex items-center gap-3 px-3 py-2 rounded-lg font-medium font-app text-tiny text-black " +
            (active ? "bg-blue-100 text-blue-700 " : "hover:bg-gray-100")}>
            <span>{icon}</span>
            {label}
        </Link>
    );
}

export const Panel = () => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleItemClick = (option) => {
    console.log(`Clicked on ${option}`);
    handleClose();
  };

    


    const location = useLocation();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {  
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            if (query) {
                navigate(`/dashboard/search?query=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <aside className="w-70 bg-[#fafafa] border-r border-[#ededed] p-4 space-y-4 flex flex-col justify-between">
            <div>
                <Link className="w-full h-8 flex items-center justify-center mt-4 mb-6" to="/">
                    <img src={config.base + "logo.svg"} alt="" />
                </Link>
                <div className='w-full mb-6'>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg w-full max-w-sm dashboard-search" >

                        <Search className="w-4 h-4 text-gray-700" />
                        <input
                            type="text"
                            spellCheck="false"
                            placeholder="Buscar"
                            autoComplete='off'
                            // value={query}
                            // onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-500"
                        />
                    </div>
                </div>
                <nav className="space-y-2">

                    <PanelItem
                        icon={<House className='w-5 h-5' />}
                        label="Inicio"
                        path="/dashboard"
                        active={location.pathname === '/dashboard'}
                    />

                    <PanelItem
                        icon={<ReceiptText className='w-5 h-5' />}
                        label="Artículos y servicios"
                        path="/dashboard/articles"
                        active={location.pathname === '/dashboard/articles'}
                    />

                    <PanelItem
                        icon={<Tag className='w-5 h-5' />}
                        label="Pagos y facturas"
                        path="/dashboard/payments"
                        active={location.pathname === '/dashboard/payments'}
                    />

                    <PanelItem
                        icon={<IdCard className='w-5 h-5' />}
                        label="Clientes"
                        path="/dashboard/customers"
                        active={location.pathname === '/dashboard/customers'}
                    />

                    <PanelItem
                        icon={<ChartNoAxesCombined className='w-5 h-5' />}
                        label="Informes"
                        path="/dashboard/reports"
                        active={location.pathname === '/dashboard/reports' || location.pathname.startsWith('/dashboard/reports/')}
                    />

                    <PanelItem
                        icon={<UsersRound className='w-5 h-5' />}
                        label="Personal"
                        path="/dashboard/staff"
                        active={location.pathname === '/dashboard/staff'}
                    />

                    <PanelItem
                        icon={<Settings className='w-5 h-5' />}
                        path="/dashboard/settings"
                        active={location.pathname === '/dashboard/settings'}
                        label="Ajustes"
                    />

                </nav>
            </div>
            <div className='relative w-full border-t border-t-[#ededed] py-6'>
               <ProfileButton></ProfileButton>
            </div>
        </aside>
    )
}
