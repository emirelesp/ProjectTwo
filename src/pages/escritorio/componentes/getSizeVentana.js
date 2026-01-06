import { useState, useEffect } from "react";

/**
 * Hook personalizado para obtener el tamaño actual de la ventana
 * y actualizarlo automáticamente cuando el usuario cambia el tamaño.
 */
export default function getSizeVentana() {
  // Estado inicial con las dimensiones actuales
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Función que actualiza el estado con las nuevas dimensiones
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Escuchar cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Limpieza del listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return getSizeVentana;
}