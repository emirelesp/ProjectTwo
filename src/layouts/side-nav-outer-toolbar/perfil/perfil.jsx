
import { ProfileCard } from './ProfileCard';
import './profile-card.scss';
import { useSelector } from 'react-redux';

 export default function Perfil(props) { 
     const {isExpand}=props
     const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

    const manejarEditar = () => { // Aquí puedes abrir un Popup de DevExtreme, navegar, etc. 
    console.log('Editar cuenta'); 
    };

     
      return ( 


        <>

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