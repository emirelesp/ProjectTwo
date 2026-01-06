import React, { useState, useEffect } from "react";

export function Temporizador({ segundos }) {
  const [tiempoRestante, setTiempoRestante] = useState(segundos);
  const [activo, setActivo] = useState(false);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    let intervalo = null;

    if (activo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      setActivo(false);
      setTerminado(true);
    }

    return () => clearInterval(intervalo);
  }, [activo, tiempoRestante]);

  const iniciarTemporizador = () => {
    setTiempoRestante(segundos);
    setTerminado(false);
    setActivo(true);
  };

  // Calcular porcentaje de progreso
  const progreso = ((segundos - tiempoRestante) / segundos) * 100;

  return (
    <div style={{ width: "100%", margin: "20px auto", textAlign: "center" }}>
   
     

      {/* Barra de progreso */}

     {terminado ? (
        <p style={{"color":"white"}}> ¡Tiempo terminado!</p>
      ) : (
        <p>Tiempo restante: {tiempoRestante} segundos</p>
      )}

      <div
        style={{
          height: "20px",
          width: "100%",
          backgroundColor: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        
        <div
          style={{
            height: "100%",
            width: `${progreso}%`,
            backgroundColor: "#4caf50",
            transition: "width 1s linear",
          }}
        >


          

        </div>
      </div>

      <button onClick={iniciarTemporizador}>Comenzar</button>
    </div>
  );
}


