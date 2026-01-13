import React, { useState, useEffect } from "react";
import '../css/BotonComenzar.css'
import { FaUser } from "react-icons/fa";

export function Temporizador(props ) {


   const {activo, setActivo,terminado, setTerminado,segundos,irPantallaCompleta,salirPantallaCompleta, children}= props;


  const [tiempoRestante, setTiempoRestante] = useState(segundos);

 


  useEffect(() => {
    let intervalo = null;

    if (activo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      setActivo(false);
      setTerminado(true);
      salirPantallaCompleta();
    }

    return () => clearInterval(intervalo);
  }, [activo, tiempoRestante]);

  const iniciarTemporizador = () => {
     debugger;
    if(terminado)return;
    irPantallaCompleta();
    setTiempoRestante(segundos);
    setTerminado(false);
    setActivo(true);
  };

  // Calcular porcentaje de progreso
  const progreso = ((segundos+1 - tiempoRestante) / segundos) * 100;

  return (
    <div style={{ width: "100%", margin: "20px auto", textAlign: "center" }}>
      { activo?(
         <>
       <div className="row">

        <div  className="col-4 col-md-3">
          { terminado ? (
              <p > Tiempo terminado</p>
            ) : (
              <p>Tiempo restante: {tiempoRestante} s</p>
            )
          }
         </div>
        <div  className="col-8 col-md-9">
                <div
                  style={{
                  height: "30px",
                  width: "100%",
                  backgroundColor: "#ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "10px",
                }}
              >
                
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                  style={{
                    height: "100%",
                    width: `${progreso}%`,
                    backgroundColor: "#4caf50",
                    transition: "width 1s linear",
                  }}
                >

                </div>
              </div>
              </div>
              </div>
                
            {children}
         </>

      ):(


           <center>
            <button className="boton-comenzar" onClick={()=>{iniciarTemporizador();}}> 
              <FaUser className="icono" /> 
              <span>
                {terminado?(
                  <>Finalizado</>
                     
                ):(<>Comenzar</>)
               }</span> 
            </button>
        </center>

      )
      }
    </div>
    
  );
}


/**
 * 
 * 
 * 
 *  {activo?(
  
     terminado ? (
        <p > ¡Tiempo terminado!</p>
      ) : (
        <p>Tiempo restante: {tiempoRestante} segundos</p>
      )

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


          {children}
        ):(


          <center>
      <button className="boton-comenzar" onClick={iniciarTemporizador}> 
         <FaUser className="icono" /> 
        <span>Comenzar</span> 
      </button>
   </center>

        )
    }
 * 
 */

