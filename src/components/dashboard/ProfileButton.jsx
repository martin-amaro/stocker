import React, { useState } from 'react'
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { CircleUserRound, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProfileButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleItemClick = (option) => {
        console.log(`Clicked on ${option}`);
        handleClose();
    };

    return (
        <Dropdown className="relative w-full ">
            <MenuButton className="relative border border-[#d5d5d5] rounded-md w-full py-4  flex items-center gap-3 text-neutral-900  font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                <CircleUserRound />
                <span className="truncate max-w-[160px] block">
                    { user ? user.name : "Perfil" }
                </span>
            </MenuButton>
            <Menu 
                className="-mt-4 w-52 bg-white rounded-md border border-gray-200 shadow-lg outline-none z-100"
            >
                <MenuItem
                    className="px-4 py-2 hover:bg-gray-100 opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer focus:outline-none focus:bg-gray-100 flex items-center gap-3 font-medium font-app text-tiny text-black"
                    // flex items-center gap-3 px-3 py-2 rounded-lg font-medium font-app text-tiny text-black
                    onClick={() => handleItemClick('Profile')}
                >
                    <User className='size-4' />
                    Perfil
                </MenuItem>
                
                <MenuItem
                    className="px-4 py-2 hover:bg-gray-100 opacity-70 hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer  focus:outline-none focus:bg-gray-100 flex items-center gap-3 font-medium font-app text-tiny text-black"
                    onClick={() => {navigate('/logout');}}
                >
                    <LogOut className='size-4'/>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}
