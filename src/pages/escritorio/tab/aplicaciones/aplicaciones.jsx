import React, { useCallback, useEffect, useState } from 'react';
import { Titulo } from '../../componentes/titulo';
import GridAplicaciones from './tabla';
import { getConsultaAreasDisciplinares, getFiltroSede } from './service/aplicacionesApi';
import { useSelector } from 'react-redux';
import TokenRegistro from './popup/tokenRegistro';
import { PopupAsignar } from './nuevo/PopupAsignar';


export default function Aplicaciones(props){

    const {seguimientoAspirante,tab,setMensaje,mensajes}=props;

    const UsuarioLogin = useSelector((state) => state.UsuarioLogin);
    const [isVisible_,setisVisible_]=useState(false);
    const[AreasDisciplinares,setAreasDisciplinares]=useState([]);
    const[AreasDisciplinaresSeleccionada,setAreasDisciplinaresSeleccionada]=useState();
   

    const[visiblePopupAsignarSede_, setVisiblePopupAsignarSede_]=useState(false);
    const[Sede_, setSede_]=useState([{text:'',value:0}]);

    //const[Refresh, setRefresh_]=useState(Date.now());

 
  const AreasDisciplinaresCallback=useCallback(async ()=>{
     const data= await getConsultaAreasDisciplinares(UsuarioLogin.idAspirante);
     setAreasDisciplinares(data);
  },[mensajes]);


  const FiltroSedeCallback=useCallback(async ()=>{
   
     const data= await getFiltroSede(UsuarioLogin.idIdentityUser);
     setSede_(data);
  },[]);


  useEffect(()=>{

   AreasDisciplinaresCallback();

  },[mensajes]);



  useEffect(()=>{

   AreasDisciplinaresCallback();
   FiltroSedeCallback();
  },[]);





  return (
    <React.Fragment>

      <PopupAsignar setRefresh={setMensaje} idAspirante={UsuarioLogin.idAspirante} dataSedes={Sede_} visiblePopupAsignarSede={visiblePopupAsignarSede_}  setVisiblePopupAsignarSede={setVisiblePopupAsignarSede_}></PopupAsignar>

      <TokenRegistro isVisible={isVisible_} setisVisible={setisVisible_}   informacionGridClic={AreasDisciplinaresSeleccionada}/>
      
        <div style={{margin: "10px"}}>
            
             <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
               <div className='row'>
                <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Mi aplicación</div>
                    <div className='p-2'></div>

                    <button className='btn btn-success' onClick={()=>{  setVisiblePopupAsignarSede_(true)  }} > Agendar Cita</button>
                    <div className='p-1'></div>
                   <GridAplicaciones data={AreasDisciplinares}  setisVisible={setisVisible_}  setData={setAreasDisciplinaresSeleccionada} ></GridAplicaciones>
                </div>
               </div>
        </div>
    </React.Fragment>
  );


}