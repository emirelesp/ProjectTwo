import React, { useCallback, useEffect, useState } from 'react';
import './escritorio.scss';
import TabPanel, { Item } from "devextreme-react/tab-panel";
import {Aplicaciones,Certificacion,Expediente,Practica,Inicio} from './tab/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { getSeguimientoAspirante } from './services/escritorioApi';
import { PreguntasMath } from './tab/preguntasMath/preguntasMath';
import { PreguntasItem } from './tab/preguntasMath/preguntasItem';

export function Escritorio(){

   const UsuarioLogin = useSelector((state) => state.UsuarioLogin);
   const [seguimientoAspirante_,setSeguimientoAspirante] =useState(0);

   const [tabSectorMensaje,setTabSectorMensaje] =useState(0);

   const getSeguimientoAspiranteCallback=  useCallback(async ()=>{
        const data= await getSeguimientoAspirante(UsuarioLogin.idAspirante);
       
        setSeguimientoAspirante(data);
   },[UsuarioLogin.idAspirante]);

   useEffect(()=>{     
     getSeguimientoAspiranteCallback();
   },[])


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
             <Item title="Inicio" >
               <Inicio seguimientoAspirante={seguimientoAspirante_}    tab={setTabSectorMensaje}></Inicio>
            </Item>
            <Item title="Mi expediente" >
               <Expediente seguimientoAspirante={seguimientoAspirante_}  tab={setTabSectorMensaje}></Expediente>
            </Item>
            <Item title="Mis aplicaciones" >
                <Aplicaciones seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje}></Aplicaciones>
            </Item>
            <Item title="Mi certificación" >
                <Certificacion seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje}></Certificacion>
            </Item>
             <Item title="Mi práctica" >
                <Practica seguimientoAspirante={seguimientoAspirante_} tab={setTabSectorMensaje}></Practica>
            </Item>
            {/* <Item title="PreguntasMatematicas" >
                <PreguntasItem seguimientoAspirante={seguimientoAspirante_}></PreguntasItem>
            </Item> */}

        </TabPanel>
    </React.Fragment>
  );


}