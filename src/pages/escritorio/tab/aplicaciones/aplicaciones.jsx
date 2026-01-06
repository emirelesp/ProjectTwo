import React from 'react';
import { Titulo } from '../../componentes/titulo';
import GridAplicaciones from './tabla';


export default function Aplicaciones(){


  return (
    <React.Fragment>
        <div style={{margin: "10px"}}>
            
             <Titulo></Titulo>
               <div className='row'>
                <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Mi aplicacion</div>
                    <div className='p-2'></div>


                   <GridAplicaciones></GridAplicaciones>
                </div>
               </div>
        </div>
    </React.Fragment>
  );


}