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
  
     const{datosArea,preguntaActualTotales,setPreguntaActualTotales,setIsExamen,
            setisVisible,
            setRefresh

     }= props;
  


  return (
    <React.Fragment>
       
       <MostrarPreguntas data={datosArea} preguntaActualTotales_={preguntaActualTotales} setPreguntaActualTotales_={setPreguntaActualTotales}
         setIsExamen={setIsExamen}
  
          setisVisible={setisVisible}
          setRefresh={setRefresh}
       
       />


   
    </React.Fragment>
  );


}







 const MostrarPreguntas= (props) => {
      

   const {data,preguntaActualTotales_,setPreguntaActualTotales_,setIsExamen,
   
    setisVisible,
   setRefresh

   }=props;

     /////////////////////////////esta aqui porque modifica las preguntas  el grid de preguntas
     const [indice, setIndice] = useState(0);




      const [activo_, setActivo_] = useState(false);
      const [terminado_, setTerminado_] = useState(false);
       const tiempo=1200;
       const [tiempoRestante, setTiempoRestante] = useState(tiempo);




        const divRef = useRef(null);

        const irFullScreen = () => {
          if (divRef.current) {
            //document.documentElement.requestFullscreen();
           // divRef.current.requestFullscreen();

           
          
         const capa = document.getElementById('fullPantallaExamen');//side-nav-outer-toolbar
            if (capa.requestFullscreen) {
              setIsExamen(false);
              capa.requestFullscreen(); // {Link: API estándar de pantalla completa https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:fullscreen}
              
            }

          }
        };

        const salirFullScreen = () => {
          setIsExamen(true);
        };




        document.addEventListener("fullscreenchange",()=>{
          if (!document.fullscreenElement) {
               // setTerminado_(true);
                setActivo_(false);
                setIsExamen(true);
          }else{
            setActivo_(true);
          }
        } );



       const estilo={

         
         "background": "#ddd",
       
         "transition": "transform 0.3s ease"


       }

       const formato= (secondos) =>{
            const hrs = Math.floor(secondos / 3600);
            const mins = Math.floor((secondos % 3600) / 60);
            const secs = secondos % 60;

            // Aseguramos que siempre tenga dos dígitos
            const pad = (num) => String(num).padStart(2, "0");

            return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
          }

        return(
          <>
         {/*      <ConfirmarSalida isVisible={isVisible_} setisVisible={setisVisible_} 
                 irPantallaCompleta={irFullScreen} salirPantallaCompleta={salirFullScreen}
                 activo={activo_} setActivo={setActivo_} 
                 terminado={terminado_} setTerminado={setTerminado_} 
              ></ConfirmarSalida> */}


              <div ref={divRef} style={{background:"white"}}>

             
            <div id="iniciodecadaexamen"></div>

             <div className='row titularesLinea'>
              <div className={activo_?'col-12 col-sm-12  col-md-12 col-lg-9 col-xl-9 col-xxl-9':'col-12 col-sm-12  col-md-12 col-lg-12 col-xl-12 col-xxl-12'}>
                  <Temporizador 
                  segundos={tiempo}
                  setTiempoRestante={setTiempoRestante}
                  tiempoRestante={tiempoRestante} activo={activo_} setActivo={setActivo_} 
                  terminado={terminado_} setTerminado={setTerminado_} irPantallaCompleta={irFullScreen} salirPantallaCompleta={salirFullScreen} 
                  
                  setisVisible={setisVisible}//cerrar el popup
                  setRefresh={setRefresh}
                  ></Temporizador>
                  
                  
                  <Pregunta indice={indice} setIndice={setIndice}  informacion={data} activo={activo_} setActivo={setActivo_} 
                  terminado={terminado_} setTerminado={setTerminado_} irPantallaCompleta={irFullScreen} salirPantallaCompleta={salirFullScreen}
                  preguntaActualTotales={preguntaActualTotales_} setPreguntaActualTotales={setPreguntaActualTotales_}
                  ></Pregunta>

                  
               </div>
               {activo_?
                   (<div className='d-none d-sm-none  d-md-none d-lg-block col-lg-3 col-xl-3 col-xxl-3'>
                    

                        <div style={{"background":"rgb(25,135,84)","height":"50px", "margin":"5px","padding":"5px"}}>

                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-clock-fill" color='#ffffff' viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                          </svg>
                          &nbsp;
                              <span className='titularesLineaBlancaPerfil' style={{"padding":"25px"}}>{formato(tiempoRestante)}</span>
                        </div>
                        <div className='p-2'>Resumen de examen</div>
                        <hr/>
                        <CuadriculaPregunta 
                        indice={indice} setIndice={setIndice}
                        preguntaActualTotales={preguntaActualTotales_} ></CuadriculaPregunta>
                        

                   </div>):(<></>)
                }
             </div>
            </div>
            </>
        )
     } 



  const CuadriculaPregunta =(props)=>{
      const {preguntaActualTotales,indice,setIndice}=props;

      let contador=0;
      let preguntaActualSimple=preguntaActualTotales[indice]?.ExamenModulo.idAspiranteExamen;
      
     
    
  
     

 
  


 
      
   
    return(

      <div className='container'>
        
      <div className='row'>
         {
         preguntaActualTotales.map((data,index)=>{

          const styleGeneral=index!=indice?{
        /* From Uiverse.io by Codewithvinay */ 
                  "height": "30px",
                    "border-radius": "8px",
                    "background": "#e0e0e0",
                    "box-shadow": "10px 10px 10px #bebebe",
                    "margin":"2px"
          }:
          {
        /* From Uiverse.io by Codewithvinay */ 
                  "height": "32px",
                    "border-radius": "8px",
                    "background": "#e0e0e0",
                    "box-shadow": "2px 3px 3px #0bec34",
                    "margin":"2px"
          }


          let style='';
           if(data.idRespuesta!=0){
            style='bg-success text-white';
           }else style='';

         
        if(data.ExamenModulo.idAspiranteExamen==preguntaActualSimple&&data.isPortada==0)contador++;


           const desplazamiento=(indexp)=>{
                                setIndice(indexp);

                                 document.getElementById("iniciodecadaexamen").scrollIntoView({ 
                                    behavior: "smooth", // desplazamiento suave 
                                    block: "center" // posición vertical (start, center, end, nearest)
                                  });
                              };

          return(
            data.ExamenModulo.idAspiranteExamen==preguntaActualSimple&&data.isPortada==0?(
            <div onClick={()=>{
              
            if(style!='')desplazamiento(index);


            }} key={'numeroCuadro'+index} className={'p-1 text-center col-3 '+style} style={styleGeneral}
              
            >
                 {contador}
            </div>
            ):(

              <div key={'numeroCuadro'+index}>
              </div>
            )
            
           );

         }
        )
        
        
        }  
   
     </div>

        <hr/>
                         <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill " color='rgb(25,135,84)' viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8"/>
                            </svg>

                          &nbsp;Contestadas
                          </div>
                           <div className='p-1'></div>
                         <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" color='rgb(224, 224, 224)' viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8"/>
                            </svg>
                           &nbsp;Pendientes
                          </div>

                          <div className='p-2'></div>
     </div>
    );
  } 






     
const ConfirmarSalida = (props) => {



  const {activo, setActivo,terminado, setTerminado,isVisible,setisVisible,irPantallaCompleta, salirPantallaCompleta}=props;
  



  return (
    <div>
    
      <Popup
        visible={isVisible}
        onHiding={() =>{
              setisVisible(false);
             // irPantallaCompleta();
          }}
        title="salir"
        width={"100%"}
        height={"auto"}
        showCloseButton={true}
        dragEnabled={true}
      >
      
      <button onClick={()=>{
        //irPantallaCompleta()

      }}>seguir</button>
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

