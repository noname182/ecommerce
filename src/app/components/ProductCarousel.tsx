"use client";

import React, { useRef } from 'react';

interface Product {
    id: number;
    nombre: string;
    precio: string;
    precioOriginal?: string;
    img: string;
    isNuevo?: boolean;
}

interface CarouselProps {
    titulo: string;
    subtitulo: string;
    bgColor?: string;
}

const ProductCarousel: React.FC<CarouselProps> = ({ titulo, subtitulo, bgColor = "bg-white" }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Datos de ejemplo para los 12 productos
    const productos: Product[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        nombre: `Producto Ejemplo ${i + 1}`,
        precio: "R$ 129,90",
        precioOriginal: i === 0 ? "R$ 179,90" : undefined, // Solo el primero tiene oferta
        img: `https://images.unsplash.com/photo-${1515886657613 + i}-9f3515b0c78f?auto=format&fit=crop&w=600`,
        isNuevo: true
    }));

    const mover = (direccion: number) => {
        if (scrollRef.current) {
            const paso = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollLeft += direccion * paso;
        }
    };

    return (
        <section className={`max-w-[1400px] mx-auto px-6 py-12 border-t border-gray-100 relative group ${bgColor}`}>
            {/* Encabezado */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight uppercase">{titulo}</h2>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{subtitulo}</p>
                </div>
                <a href="#" className="text-sm font-bold text-gray-400 hover:text-black transition-colors underline">Ver todos</a>
            </div>

            <div className="relative">
                {/* Botón Izquierdo */}
                <button 
                    onClick={() => mover(-1)}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl p-3 rounded-full hover:bg-gray-200 transition-all opacity-0 group-hover:opacity-100 hidden md:flex border border-gray-200 cursor-pointer"
                >
                    <i className="fas fa-chevron-left text-gray-600"></i>
                </button>




                {/* Contenedor de Scroll */}
                <div 
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 md:gap-6 scroll-smooth py-4 no-scrollbar"
                >
                    {productos.map((prod) => (
                        <div key={prod.id} className="flex-none w-[260px] md:w-[300px] flex flex-col group/item cursor-pointer">
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f8f8]">
                                {prod.isNuevo && (
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 font-bold uppercase z-10">Nuevo</span>
                                )}
                
                                {/* Corazón Interactivo */}
                                <button className="absolute top-3 right-3 z-20 group/fav w-8 h-8 flex items-center justify-center cursor-pointer">
                                    <i className="far fa-heart absolute text-xl text-gray-800 transition-opacity duration-300 group-hover/fav:opacity-0"></i>
                                    <i className="fas fa-heart absolute text-xl text-red-500 opacity-0 transition-opacity duration-300 group-hover/fav:opacity-100"></i>
                                </button>

                                <img 
                                    src={prod.img} 
                                    alt={prod.nombre}
                                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Info del Producto */}
                            <div className="mt-3">
                                <h3 className="text-[13px] text-gray-600 leading-snug overflow-hidden font-medium">{prod.nombre}</h3>
                                {prod.precioOriginal && (
                                    <p className="text-[11px] text-gray-400 line-through italic leading-none">De {prod.precioOriginal}</p>
                                )}
                                <p className={`font-bold text-lg ${prod.precioOriginal ? "text-red-600" : "text-gray-900"}`}>
                                    {prod.precioOriginal ? `Por ${prod.precio}` : prod.precio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>



                {/* Botón Derecho */}
                <button 
                    onClick={() => mover(1)}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl p-3 rounded-full hover:bg-gray-200 transition-all opacity-0 group-hover:opacity-100 hidden md:flex border border-gray-200 cursor-pointer"
                >
                    <i className="fas fa-chevron-right text-gray-600"></i>
                </button>
            </div>
        </section>
    );
};

export default ProductCarousel;