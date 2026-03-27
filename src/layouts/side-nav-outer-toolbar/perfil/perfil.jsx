
import { useCallback, useEffect, useState } from 'react';
import { ProfileCard } from './ProfileCard';
import { Direccion } from './domicilio/direccion';
import './profile-card.scss';
import { useSelector } from 'react-redux';
import { getDomicilio, getEstados } from './domicilio/services/apiDireccion';

 export default function Perfil(props) { 
     const {isExpand}=props
     const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

     const [visiblePopup, setVisiblePopup] =useState(false);

     const [direccion, setDireccion] =useState({});
     const [estado, setEstado] =useState({});

      const getEstadoUseCall=useCallback(async ()=>{

      const result=await getEstados();
       setEstado(result);
  
    },[visiblePopup,UsuarioLogin.idAspirante]);

    const getdireccionUseCall=useCallback(async ()=>{

        const result=await getDomicilio(UsuarioLogin.idAspirante);
       setDireccion(result);
    
    },[visiblePopup,UsuarioLogin.idAspirante]);


    useEffect(()=>{
     if(visiblePopup){
        getEstadoUseCall();
        getdireccionUseCall();
     }

    },[visiblePopup,UsuarioLogin.idAspirante]);



    const manejarEditar = () => { // Aquí puedes abrir un Popup de DevExtreme, navegar, etc. 
    //console.log('Editar cuenta'); 
        setVisiblePopup(true);
  
  
     };

     
      return ( 


        <>

        {visiblePopup?(
        <Direccion  visiblePopup={visiblePopup} setVisiblePopup={setVisiblePopup}
         idAspirante={UsuarioLogin.idAspirante} 
          dataEstados={estado}
          direccion1={direccion[0]}
          setDireccion1={setDireccion}
        ></Direccion>):(<></>)
        }
        <div className='p-3 text-center titularesLineaBlancaPerfil'><span>PERFIL</span></div>
          <div style={{ padding: 0}}>
     
            <ProfileCard 
            isExpand={isExpand}
            nombre={UsuarioLogin.nombre} 
            imagenUrl={UsuarioLogin.avatarUrl} 
            onEditar={manejarEditar} /> 
        </div> 

        </>
    );
 }