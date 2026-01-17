"use client";

import React, { useState, useEffect } from 'react';

const MainSlider = () => {
    const [current, setCurrent] = useState(0);
  
    // Definimos las imágenes aquí para que el código sea limpio
    const slides = [
        { id: 0, img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070' },
        { id: 1, img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070' },
        { id: 2, img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070' },
        { id: 3, img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070' },
    ];

    const moveSlide = (direccion: number) => {
        if (direccion === 1) {
            setCurrent(current === slides.length - 1 ? 0 : current + 1);
        } else {
            setCurrent(current === 0 ? slides.length - 1 : current - 1);
        }
    };

    // Autoplay opcional: Cambia de slide cada 5 segundos
    useEffect(() => {
        const timer = setInterval(() => moveSlide(1), 5000);
        return () => clearInterval(timer);
    }, [current]);

    return (
        <section className="relative w-full overflow-hidden group h-[450px] md:h-[600px]">
            {/* Contenedor del Slider */}
            <div 
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ 
                    width: `${slides.length * 100}%`, 
                    transform: `translateX(-${(current * 100) / slides.length}%)` 
                }}
            >
                {slides.map((slide) => (
                    <div 
                        key={slide.id}
                        className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
                        style={{ backgroundImage: `url('${slide.img}')` }}
                    >
                        {/* Overlay oscuro para que el botón resalte */}
                        <div className="absolute inset-0 bg-black/10"></div>
            
                        <div className="absolute bottom-16 z-10">
                            <button className="bg-white text-black px-10 py-3 font-bold uppercase hover:bg-black hover:text-white transition-colors shadow-lg cursor-pointer">
                                Comprar Ahora
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones de Navegación */}
            <button 
                onClick={() => moveSlide(-1)} 
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 shadow-md cursor-pointer"
            >
                <i className="fas fa-chevron-left text-xl"></i>
            </button>

            <button 
                onClick={() => moveSlide(1)} 
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 shadow-md cursor-pointer"
            >
                <i className="fas fa-chevron-right text-xl"></i>
            </button>

            {/* Indicadores (Dots) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                {slides.map((_, index) => (
                    <button 
                        key={index}
                        onClick={() => setCurrent(index)} 
                        // Agregamos cursor-pointer aquí
                        className={`w-3 h-3 rounded-full border-2 border-white transition-all cursor-pointer ${
                            current === index ? "bg-white scale-125" : "bg-transparent hover:bg-white/30"
                        }`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default MainSlider;