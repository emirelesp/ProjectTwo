import React, { useCallback, useEffect, useState } from 'react';
import ExamenPractica from './componente/pregunta';
import { Temporizador } from './componente/temporizador';
import { TabPanel } from 'devextreme-react';
import { getAreasDisciplinaresPrueba } from './Service/practicaApi';
import { useRef } from "react";
import Popup from "devextreme-react/popup";



export default function Practica(){


 const  [AreaDisciplinar,setAreaDisciplinar ]=useState([]);






 const gettab=useCallback(async ()=>{

  const result=await getAreasDisciplinaresPrueba(2);
  setAreaDisciplinar(result);
  

 },[]);


 useEffect(()=>{

    gettab();


 },[]);



  return (
    <React.Fragment>
       
          <TabPanel
            width="100%"
            height="100%"
            animationEnabled={true}
            swipeEnabled={true}
            showNavButtons={true}
            scrollByContent={true}
            dataSource={AreaDisciplinar}
           // tabsPosition={direccionTab}
            iconPosition='top'
            itemComponent={mostrarPreguntas}      
          />

    </React.Fragment>
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





   const mostrarPreguntas= ({data}) => {
        
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
       
          //debugger;
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
              <ExamenPractica informacion={data} activo={activo_} setActivo={setActivo_} 
              terminado={terminado_} setTerminado={setTerminado_} irPantallaCompleta={irFullScreen} salirPantallaCompleta={salirFullScreen}></ExamenPractica>
           
            </div>
            </>
        )
     } 



