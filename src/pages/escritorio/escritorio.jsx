import React, { useCallback, useEffect, useState } from 'react';
import './escritorio.scss';
import TabPanel, { Item } from "devextreme-react/tab-panel";
import {Aplicaciones,Certificacion,Expediente,Practica,Inicio} from './tab/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { getSeguimientoAspirante } from './services/escritorioApi';

export function Escritorio(){

   const UsuarioLogin = useSelector((state) => state.UsuarioLogin);
   const [seguimientoAspirante_,setSeguimientoAspirante] =useState(0);

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
          >
             <Item title="Inicio" >
               <Inicio seguimientoAspirante={seguimientoAspirante_}></Inicio>
            </Item>
            <Item title="Mi expediente" >
               <Expediente seguimientoAspirante={seguimientoAspirante_}></Expediente>
            </Item>
            <Item title="Mis aplicaciones" >
                <Aplicaciones seguimientoAspirante={seguimientoAspirante_}></Aplicaciones>
            </Item>
            <Item title="Mi certificación" >
                <Certificacion seguimientoAspirante={seguimientoAspirante_}></Certificacion>
            </Item>
             <Item title="Mi práctica" >
                <Practica seguimientoAspirante={seguimientoAspirante_}></Practica>
            </Item>
        </TabPanel>
    </React.Fragment>
  );


}