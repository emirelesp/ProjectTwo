import React, { useState } from 'react';
import { Titulo } from '../../componentes/titulo';
import GridResultado from './tabla';
import ConstanciaResultados from './popup/constanciaresultados';


export default function Resultado(props){

      const {setIsExamen,seguimientoAspirante,tab,setMensaje,mensajes,catalogoResultados}=props;

    const [isVisible,setisVisible] =useState();





  return (
    <React.Fragment>


        <ConstanciaResultados   isVisible={isVisible} setisVisible={setisVisible} ></ConstanciaResultados>
       <div style={{margin: "10px"}}>
           
             <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
              <div className='row'>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Mis resultados</div>
                    <div className='p-2'></div>
                   <button className='btn btn-success' onClick={()=>{

                      setisVisible(true);

                   }}>Descarga la constancia resultados</button>

                      <div className='p-1'></div>
                   <GridResultado catalogoResultados={catalogoResultados}></GridResultado>
                </div>
              </div>
        </div>
    </React.Fragment>
  );


}