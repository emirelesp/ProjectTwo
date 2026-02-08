import React from 'react';
import { Titulo } from '../../componentes/titulo';
import GridCertificacion from './tabla';


export default function Certificacion(props){
  const {seguimientoAspirante,tab,setMensaje,mensajes}=props;

  return (
    <React.Fragment>
       <div style={{margin: "10px"}}>
           
             <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
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