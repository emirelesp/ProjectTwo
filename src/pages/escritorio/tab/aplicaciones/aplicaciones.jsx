import React, { useCallback, useEffect, useState } from 'react';
import { Titulo } from '../../componentes/titulo';
import GridAplicaciones from './tabla';
import { getConsultaAreasDisciplinares } from './service/aplicacionesApi';
import { useSelector } from 'react-redux';
import TokenRegistro from './popup/tokenRegistro';


export default function Aplicaciones(props){

    const {seguimientoAspirante}=props;

    const UsuarioLogin = useSelector((state) => state.UsuarioLogin);
    const [isVisible_,setisVisible_]=useState(false);
    const[AreasDisciplinares,setAreasDisciplinares]=useState([]);

    const[AreasDisciplinaresSeleccionada,setAreasDisciplinaresSeleccionada]=useState();
   


  const AreasDisciplinaresCallback=useCallback(async ()=>{
     const data= await getConsultaAreasDisciplinares(UsuarioLogin.idAspirante);
     setAreasDisciplinares(data);
  },[]);





  useEffect(()=>{

   AreasDisciplinaresCallback();

  },[]);





  return (
    <React.Fragment>

      <TokenRegistro isVisible={isVisible_} setisVisible={setisVisible_}   informacionGridClic={AreasDisciplinaresSeleccionada}/>
      
        <div style={{margin: "10px"}}>
            
             <Titulo estatus={seguimientoAspirante}></Titulo>
               <div className='row'>
                <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Mi aplicación</div>
                    <div className='p-2'></div>


                   <GridAplicaciones data={AreasDisciplinares}  setisVisible={setisVisible_}  setData={setAreasDisciplinaresSeleccionada} ></GridAplicaciones>
                </div>
               </div>
        </div>
    </React.Fragment>
  );


}