import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      {/* Top Bar: Logo, Buscador y Usuario */}
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-[#e60014] text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-xl italic">
            r
          </div>
          <span className="text-[#e60014] text-3xl font-bold tracking-tighter">RENNER</span>
        </div>

        {/* Buscador */}
        <div className="flex-1 max-w-2xl mx-10 relative">
            <input type="text" 
                placeholder="Buscar productos" 
                className="w-full bg-[#f2f2f2] border border-gray-200 rounded-md py-2.5 px-4 outline-none focus:border-gray-400 transition-all text-black"
            />
            <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg cursor-pointer"></i>
        </div>

        {/* Acciones de Usuario */}
        <div className="flex items-center gap-6 text-black">
          <Link 
            href="/login" 
            className="text-sm font-bold hover:underline cursor-pointer transition-all"
          >
            Entre ou cadastre-se
          </Link>
          
          <div className="flex gap-5 text-xl text-gray-700">
            <i className="far fa-heart cursor-pointer hover:text-red-500 transition-colors"></i>
            
            <div className="relative cursor-pointer">
              <i className="fas fa-shopping-bag"></i>
              <span className="absolute -top-2 -right-2 bg-[#e60014] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center italic font-bold">
                r
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación Principal (Usa tus colores configurados) */}
      <nav className="w-full bg-red-600">
        <ul className="max-w-[1400px] mx-auto flex justify-between items-center font-bold text-white uppercase tracking-wider overflow-hidden">
          {['Novedades', 'Femenino', 'Masculino', 'Infantil', 'Accesorios'].map((item) => (
            <li key={item} className="flex-1 h-14 min-w-fit">
              <a href="#" className="flex items-center justify-center h-full text-[12px] md:text-[13px] hover:text-[15px] hover:bg-red-500 transition-all duration-300 ease-in-out px-2">
                {item}
              </a>
            </li>
          ))}
          
          {/* Item especial OFF / SALE */}
          <li className="flex-1 h-14 min-w-fit">
            <a href="#" className="flex items-center justify-center h-full text-[12px] md:text-[13px] hover:text-[15px] bg-[#b30000] hover:bg-menuRojoClaro transition-all duration-300 ease-in-out text-yellow-300 px-2">
                OFF / SALE
            </a>
          </li>   
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;