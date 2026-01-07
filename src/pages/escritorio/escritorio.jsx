import React from 'react';
import './escritorio.scss';
import TabPanel, { Item } from "devextreme-react/tab-panel";
import {Aplicaciones,Certificacion,Expediente,Practica,Inicio} from './tab/index'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Escritorio(){


  return (
    <React.Fragment>
          <TabPanel
           className="rounded-tabpanel"
            showNavButtons={true}
            scrollByContent={true}
          >
             <Item title="Inicio" >
               <Inicio></Inicio>
            </Item>
            <Item title="Mi expediente" >
               <Expediente></Expediente>
            </Item>
            <Item title="Mis aplicaciones" >
                <Aplicaciones></Aplicaciones>
            </Item>
            <Item title="Mi certificación" >
                <Certificacion></Certificacion>
            </Item>
             <Item title="Mi práctica" >
                <Practica></Practica>
            </Item>
        </TabPanel>
    </React.Fragment>
  );


}