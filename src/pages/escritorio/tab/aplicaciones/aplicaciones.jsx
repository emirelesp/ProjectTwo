import React, { useCallback, useEffect, useState } from 'react';
import { Titulo } from '../../componentes/titulo';
import GridAplicaciones from './tabla';
import { getConsultaAreasDisciplinares, getFiltroSede, hasToken } from './service/aplicacionesApi';
import { useSelector } from 'react-redux';
import TokenRegistro from './popup/tokenRegistro';
import { PopupAsignar } from './nuevo/PopupAsignar';


export default function Aplicaciones(props){

    const {setIsExamen,seguimientoAspirante,tab,setMensaje,mensajes}=props;

    const UsuarioLogin = useSelector((state) => state.UsuarioLogin);
    const [isVisible_,setisVisible_]=useState(false);
    const[AreasDisciplinares,setAreasDisciplinares]=useState([]);
    const[AreasDisciplinaresSeleccionada,setAreasDisciplinaresSeleccionada]=useState();
   

    const[visiblePopupAsignarSede_, setVisiblePopupAsignarSede_]=useState(false);
    const[Sede_, setSede_]=useState([{text:'',value:0}]);

    //const[Refresh, setRefresh_]=useState(Date.now());
/*{
    "idAspiranteExamen": 33,
    "sede": "Celaya",
    "fechaExamen": "2026-03-09T00:00:00",
    "areaDisciplinar": "Lengua y Comunicación",
    "icon": "pdffile",
    "title": "Lengua y Comunicación",
    "idOportunidad": 1,
    "bloque": 1,
    "minutos": 10
}*/ 


  const formatearFechatipoSQl = (fecha) => {
     
        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const anio = fecha.getFullYear();

       // console.log("Fecha Formateada: ");
        return  `${anio}-${mes}-${dia}T00:00:00`;;
    }


 
  const AreasDisciplinaresCallback=useCallback(async ()=>{
     let data= await getConsultaAreasDisciplinares(UsuarioLogin.idAspirante);

     ///voy verificar si es el día correcto
     const fecha=formatearFechatipoSQl(new Date());

     ///debugger;
       if(data?.length!=0){



        ////////////////////////////////////////////////////////////////////////Tokkkkekekekekekekkekekekekekeke
         
      const resultadohasToken= await hasToken(UsuarioLogin.idAspirante);
        
        if(
          resultadohasToken.value==1
        // data[0].fechaExamen!=fecha
        ){ ///validacion de la aplicación con fecha y el token



          }else{
            data=[  {...data[0],...{
                      idAspiranteExamen: 0,
                      areaDisciplinar: "",
                      idOportunidad: 0,
                      bloque: -1,
                      sede:null
                    }
                  }
            ];
          }
       }
     
     
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


      <TokenRegistro setIsExamen={setIsExamen} isVisible={isVisible_} setisVisible={setisVisible_}   informacionGridClic={AreasDisciplinaresSeleccionada}
        setRefresh={setMensaje}
      />
      

      <PopupAsignar setRefresh={setMensaje} idAspirante={UsuarioLogin.idAspirante} dataSedes={Sede_} visiblePopupAsignarSede={visiblePopupAsignarSede_}  setVisiblePopupAsignarSede={setVisiblePopupAsignarSede_}></PopupAsignar>

   
        <div style={{margin: "10px"}}>
            
             <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
               <div className='row'>
                <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "20px",fontWeight:700}}>Mis aplicaciones</div>
                    <div className='p-2'></div>

                 {seguimientoAspirante.value==6?(
                    <button className='btn btn-success' onClick={()=>{  setVisiblePopupAsignarSede_(true)  }} > Agendar Cita</button>
                 ):(<></>)
                  }


                    <div className='p-1'></div>
                   <GridAplicaciones data={AreasDisciplinares}  setisVisible={setisVisible_}  setData={setAreasDisciplinaresSeleccionada} 
                       
                   
                   ></GridAplicaciones>
                </div>
               </div>
        </div>
    </React.Fragment>
  );


}