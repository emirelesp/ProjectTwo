import React, { useState } from 'react';
import { Titulo } from '../../componentes/titulo';
import GridResultado from './tabla';
import ConstanciaResultados from './popup/constanciaresultados';
import DictamenResultados from './popup/DictamenResultado';


export default function Resultado(props){

      const {setIsExamen,seguimientoAspirante,tab,setMensaje,mensajes,catalogoResultados}=props;

    const [isVisible,setisVisible] =useState();
    const [isVisibleDF,setisVisibleDF] =useState();





  return (
    <React.Fragment>


        <ConstanciaResultados   isVisible={isVisible} setisVisible={setisVisible} ></ConstanciaResultados>
     {/*    <DictamenResultados   isVisible={isVisibleDF} setisVisible={setisVisibleDF} ></DictamenResultados>*/} 
       <div style={{margin: "10px"}}>
           
             <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
              <div className='row'>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Mis resultados</div>
                    <div className='p-2'></div>
                   <button className='btn btn-success' onClick={()=>{

                      setisVisible(true);

                   }}>Descargar dictamen</button>

                   &nbsp;
                   {/* {seguimientoAspirante.value==9?( */}

                {/*    
                   <button className='btn btn-warning' onClick={()=>{

                      setisVisibleDF(true);

                   }}>Descarga dictamen final</button>

                 */}
                 {/*  ):(<></>)
                  } */}

                      <div className='p-1'></div>
                   <GridResultado catalogoResultados={catalogoResultados}></GridResultado>
                </div>
              </div>
        </div>
    </React.Fragment>
  );


}