import Navbar from './/components/Navbar';
import MainSlider from './components/MainSlider';
import ProductCarousel from './components/ProductCarousel';

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <MainSlider />


            {/* Seccion Mas vendidos */}
            <ProductCarousel 
              titulo="Mas vendidos" 
              subtitulo="Lo mas destacado" 
              bgColor="bg-gray-100" 
            />

            {/* Seccion Novedades */}
            <ProductCarousel 
              titulo="Novedades" 
              subtitulo="Explore el mindo de la moda" 
              bgColor="bg-white" 
            />

            {/* Sección Masculina con fondo gris */}
            <ProductCarousel 
              titulo="Moda Masculina" 
              subtitulo="Ropa masculino" 
              bgColor="bg-gray-100" 
            />

            {/* Sección Femenina (opcional, reutilizando el mismo componente) */}
            <ProductCarousel 
              titulo="Moda Femenina" 
              subtitulo="Tendencias para ella" 
              bgColor="bg-white" 
            />
           
            
        </main>
  );
}