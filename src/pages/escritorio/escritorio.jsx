import React, { useCallback, useEffect, useState } from 'react';
import './escritorio.scss';
import TabPanel, { Item } from "devextreme-react/tab-panel";
import {Aplicaciones,Certificacion,Expediente,Practica,Inicio} from './tab/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { getSeguimientoAspirante } from './services/escritorioApi';
import { PreguntasMath } from './tab/preguntasMath/preguntasMath';
import { PreguntasItem } from './tab/preguntasMath/preguntasItem';


import { locale } from 'devextreme/localization';
import { PreguntaNuevoDiseño } from './tab/ejemploPreguntasMain/testPreguntasDiseño';

// Establece el idioma a español
locale('es');


export function Escritorio(){

   const UsuarioLogin = useSelector((state) => state.UsuarioLogin);
   const [seguimientoAspirante_,setSeguimientoAspirante] =useState(0);
   const [tabSectorMensaje,setTabSectorMensaje] =useState(0);

   const [mensajes_, setMensaje_] = useState(Date.now());




   const [isExamen,setIsExamen]=useState(true);


   const getSeguimientoAspiranteCallback=  useCallback(async ()=>{
        const data= await getSeguimientoAspirante(UsuarioLogin.idAspirante);
        setSeguimientoAspirante(data);
      
   },[UsuarioLogin.idAspirante,mensajes_]);

   useEffect(()=>{     
     getSeguimientoAspiranteCallback();
   },[mensajes_])


  return (
    <React.Fragment>
          <TabPanel
         
           className="rounded-tabpanel"
            showNavButtons={true}
            scrollByContent={true}
            selectedIndex={tabSectorMensaje}
             elementAttr={{ class: "tabEscritorio" }} 
           onSelectionChanged={(e) => setTabSectorMensaje(e.component.option("selectedIndex"))}
          >
             {/* <Item title="PreguntaNuevoDiseño" >
               <PreguntaNuevoDiseño setIsExamen={setIsExamen}></PreguntaNuevoDiseño>
            </Item>  */}
              

            {isExamen?(
              <>
                    <Item title="Inicio" >
                      <Inicio seguimientoAspirante={seguimientoAspirante_}    tab={setTabSectorMensaje} ></Inicio>
                    </Item>
                    <Item title="Mi expediente" >
                      <Expediente seguimientoAspirante={seguimientoAspirante_}  tab={setTabSectorMensaje}  setMensaje={setMensaje_} mensajes={mensajes_}></Expediente>
                    </Item>
                    <Item title="Mis aplicaciones" >
                        <Aplicaciones setIsExamen={setIsExamen} seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje} setMensaje={setMensaje_} mensajes={mensajes_}></Aplicaciones>
                    </Item>
                    <Item title="Mi certificación" >
                        <Certificacion seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje}></Certificacion>
                    </Item>
                    <Item title="Mi práctica" >
                        <Practica seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje}></Practica>
                    </Item>
               </>
              ):(

                <>
                   <Item title="Mis aplicaciones" >
                        <Aplicaciones setIsExamen={setIsExamen} seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje} setMensaje={setMensaje_} mensajes={mensajes_}></Aplicaciones>
                    </Item>
                </>

              )
            }
            
            {/* <Item title="PreguntasMatematicas" >
                <PreguntasItem seguimientoAspirante={seguimientoAspirante_}></PreguntasItem>
            </Item> */}  
            
          


        </TabPanel>
    </React.Fragment>
  );


}