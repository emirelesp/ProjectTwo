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
import Resultado from './tab/resultados/resultado';
import { getOPortunidad, getResultados } from './tab/resultados/service/practicaApi';

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







/********************Habilitar pestaña resultados******************************************* */

const [catalogoResultados,setCatalogoResultados] =useState([]);

const resultados=useCallback(async ()=>{

  const resultApi= await getResultados(UsuarioLogin.idAspirante);
  setCatalogoResultados(resultApi);

},[UsuarioLogin.idAspirante]);
/////////////////////////////////////////////////////////////////////////////////////////////////

const [oportunidad,setOportunidad] =useState([]);

const oportunidadCallback=useCallback(async ()=>{

  const resultApi= await getOPortunidad(UsuarioLogin.idAspirante);

  if(resultApi.length==0)setOportunidad({text:'',value:-1});
  else setOportunidad(resultApi[0]);

},[UsuarioLogin.idAspirante]);







useEffect(()=>{
   resultados();
   oportunidadCallback();
},[UsuarioLogin.idAspirante]);




/////////////////////////////////////////////////////////////////


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
                      <Inicio seguimientoAspirante={seguimientoAspirante_}    tab={setTabSectorMensaje} 
                          oportunidad ={oportunidad } setOportunidad={setOportunidad}
                      ></Inicio>
                    </Item>
                    <Item title="Mi expediente" >
                      <Expediente seguimientoAspirante={seguimientoAspirante_}  tab={setTabSectorMensaje}  setMensaje={setMensaje_} mensajes={mensajes_}
                      
                        oportunidad ={oportunidad } setOportunidad={setOportunidad}
                      ></Expediente>
                    </Item>
                    <Item title="Mi diagnóstico" >
                        <Practica seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje}></Practica>
                    </Item>
                    {seguimientoAspirante_.value==7||seguimientoAspirante_.value==6?
                    <Item title="Mi examen" >
                        <Aplicaciones setIsExamen={setIsExamen} seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje} setMensaje={setMensaje_} mensajes={mensajes_}
                          oportunidad ={oportunidad } setOportunidad={setOportunidad}
                        ></Aplicaciones>
                    </Item>
                    :<></>
                     }
                    {/* {catalogoResultados?.length>0? */}
                      <Item title="Mis resultados" >
                          <Resultado setIsExamen={setIsExamen} seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje} setMensaje={setMensaje_} mensajes={mensajes_}
                          
                                catalogoResultados={catalogoResultados}
                                oportunidad ={oportunidad } setOportunidad={setOportunidad}
                          
                          ></Resultado>
                    </Item>
                  {/*   :<></>
                    } */}
                     {/*<Item title="Mi certificación" >
                        <Certificacion seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje}></Certificacion>
                    </Item> */}
                  
               </>
              ):(

                <>
                   <Item title="Mi examen" >
                        <Aplicaciones setIsExamen={setIsExamen} seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje} setMensaje={setMensaje_} mensajes={mensajes_}
                          oportunidad ={oportunidad } setOportunidad={setOportunidad}
                        
                        ></Aplicaciones>
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