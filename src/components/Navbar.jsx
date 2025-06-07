import React from 'react';
import navLinks from '../constants/index.js'

const NavItems = () => {
    return(
        <ul className="mt-5 flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-20">
            {navLinks.map(({id, href, name}) => (
                <li key={id} className="text-neutral-400 hover:text-white font-generalsans max-sm:hover:bg-black-500 mb-7 max-sm:w-full max-sm:rounded-md py-2 max-sm:px-5">
                    <a href={href} className="text-lg md:text-base hover:text-white transition-colors" onClick={() =>{}}>
                        {name}
                    </a>
                </li>
            ))}
        </ul>
    )
}

const Navbar = () => {
  return (
    <>
    <nav className="w-full navbar px-6 mt-4">
      <div className="mx-auto flex justify-between items-center">
        {/* Language Switch */}
        <div className="flex items-center space-x-4">
          <a href="#" className='hover:text-white'>Deutsch</a>
          <span>|</span>
          <a href="#" className='text-white'>English</a>
        </div>

        {/* Logo */}
        <div>
          <img
            src="../assets/MB-star_white.svg"
            className="w-10 h-10"
            alt="Mercedes-Benz Logo"
          />
        </div>

        {/* Right Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="flex items-center gap-1">
            Search
            <ion-icon name="search"></ion-icon>
          </a>
          <a href="#" className="flex items-center gap-1">
            Login
            <ion-icon name="chevron-down-outline"></ion-icon>
          </a>
        </div>
      </div>
    </nav>
    <div className='flex text justify-center items-center'>
        <NavItems />
    </div>
    </>
  );
};

export default Navbar;
