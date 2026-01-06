import React from 'react';
import { Titulo } from '../../componentes/titulo';
import GridCertificacion from './tabla';


export default function Certificacion(){


  return (
    <React.Fragment>
       <div style={{margin: "10px"}}>
           
             <Titulo></Titulo>
              <div className='row'>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Certificación</div>
                    <div className='p-2'></div>


                   <GridCertificacion></GridCertificacion>
                </div>
              </div>
        </div>
    </React.Fragment>
  );


}