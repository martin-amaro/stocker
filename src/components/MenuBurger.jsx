import React, { useEffect, useState } from 'react'

export const MenuBurger = ({nav= "", buttonHolder = "", children, isOpen=null, setIsOpen=null}) => {
  const [internalOpen, internalSetOpen] = useState(false);
  const menuOpen = isOpen !== null ? isOpen : internalOpen;
  const toggleMenuOpen = () => {
    if (setIsOpen) {
      setIsOpen(!menuOpen);
    } else {
      internalSetOpen(!menuOpen);
    }
  };

  useEffect(() => {
          if (menuOpen) {
              document.body.style.overflow = 'hidden';
          } else {
              document.body.style.overflow = '';
          }
      }, [menuOpen]);
  

  return (
    <>
      <div className={buttonHolder}>
        <button
          onClick={toggleMenuOpen}
          className={"lg:hidden z-[10001] w-10 h-10 flex items-center justify-center relative px-1 " + (menuOpen ? 'active' : '')}
          id="menuToggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className=''></div>
        </button>
      </div>

      <nav
        className=
        {`fixed inset-0 bg-white flex flex-col items-center px-2
                            z-[1000] lg:hidden transform transition-transform
                            duration-400 ${menuOpen ? 'translate-x-0 ' : 'translate-x-full ' }` + nav}
      >
        { children }
      </nav>
    </>


  )
}
