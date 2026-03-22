import React from 'react';
import { Titulo } from '../../componentes/titulo';
import GridResultado from './tabla';


export default function Resultado(props){

      const {setIsExamen,seguimientoAspirante,tab,setMensaje,mensajes,catalogoResultados}=props;

  return (
    <React.Fragment>
       <div style={{margin: "10px"}}>
           
             <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
              <div className='row'>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Mis resultados</div>
                    <div className='p-2'></div>


                   <GridResultado catalogoResultados={catalogoResultados}></GridResultado>
                </div>
              </div>
        </div>
    </React.Fragment>
  );


}