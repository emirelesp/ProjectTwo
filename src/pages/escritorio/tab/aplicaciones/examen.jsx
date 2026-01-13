import React, { useCallback, useEffect, useState } from 'react';
import ExamenPractica from './componente/pregunta';
import { Temporizador } from './componente/temporizador';
import { TabPanel } from 'devextreme-react';
import { getConsultaAreasDisciplinares } from './service/aplicacionesApi';
import { useRef } from "react";
import Popup from "devextreme-react/popup";
import Pregunta from './componente/pregunta';


/**
 * 
 * @param {
    "idAspiranteExamen": 1,
    "sede": "Celaya",
    "fechaExamen": "2026-03-07T00:00:00",
    "areaDisciplinar": "1. Ciencias Sociales",
    "icon": "pdffile",
    "title": "1. Ciencias Sociales"
 */

export default function Examen(props){

     const{datosArea,preguntaActualTotales,setPreguntaActualTotales}= props;



  return (
    <React.Fragment>
       
       <MostrarPreguntas data={datosArea} preguntaActualTotales_={preguntaActualTotales} setPreguntaActualTotales_={preguntaActualTotales}/>
   
    </React.Fragment>
  );


}







 const MostrarPreguntas= (props) => {
      

   const {data,preguntaActualTotales_,setPreguntaActualTotales_}=props;




      const [activo_, setActivo_] = useState(false);
      const [terminado_, setTerminado_] = useState(false);
      const [isVisible_, setisVisible_] = useState(false);


        const divRef = useRef(null);

        const irFullScreen = () => {
          if (divRef.current) {
            //document.documentElement.requestFullscreen();
            divRef.current.requestFullscreen();
          }
        };

        const salirFullScreen = () => {
       
      
          setTerminado_(true);
          setActivo_(false);
            /*   if (document.fullscreenElement) {
                document.exitFullscreen()
                .catch(err => console.error("Error exiting fullscreen:", err));
            } else {
                console.log("Not in fullscreen mode");
            } */

        };




        document.addEventListener("fullscreenchange",()=>{
          if (!document.fullscreenElement) {
                setTerminado_(true);
               setActivo_(false);
          }
        } );


        return(
          <>
              <ConfirmarSalida isVisible={isVisible_} setisVisible={setisVisible_} 
                 irPantallaCompleta={irFullScreen} salirPantallaCompleta={salirFullScreen}
                 activo={activo_} setActivo={setActivo_} 
                terminado={terminado_} setTerminado={setTerminado_} 
                 ></ConfirmarSalida>


            <div ref={divRef} style={{background:"white"}}>

             
            
              <Temporizador segundos={100} activo={activo_} setActivo={setActivo_} 
              terminado={terminado_} setTerminado={setTerminado_} irPantallaCompleta={irFullScreen} salirPantallaCompleta={salirFullScreen} ></Temporizador>
              <Pregunta informacion={data} activo={activo_} setActivo={setActivo_} 
              terminado={terminado_} setTerminado={setTerminado_} irPantallaCompleta={irFullScreen} salirPantallaCompleta={salirFullScreen}
              preguntaActualTotales={preguntaActualTotales_} setPreguntaActualTotales={preguntaActualTotales_}
              
              ></Pregunta>
           
            </div>
            </>
        )
     } 


     
const ConfirmarSalida = (props) => {



  const {activo, setActivo,terminado, setTerminado,isVisible,setisVisible,irPantallaCompleta, salirPantallaCompleta}=props;
  



  return (
    <div>
    
      <Popup
        visible={isVisible}
        onHiding={() =>{
              setisVisible(false);
              irPantallaCompleta();
          }}
        title="salir"
        width={"100%"}
        height={"auto"}
        showCloseButton={true}
        dragEnabled={true}
      >
      
      <button onClick={()=>{irPantallaCompleta()}}>seguir</button>
      <button onClick={()=>{
        // Simular la pulsación de Escape
      

          setisVisible(false);
          setActivo(false);
          setTerminado(true); 
          
      }}>cancelar</button>

      </Popup>
    </div>
  );
};

