import { useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import DropDownButton from 'devextreme-react/drop-down-button';
import List from 'devextreme-react/list';
import { useAuth } from '../../contexts/auth-hooks';
import './UserPanel.scss';
import { useSelector } from 'react-redux';


export default function UserPanel({ menuMode }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();



 const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

  const navigateToProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

   const navigateToEscritorio = useCallback(() => {
    navigate("/escritorio");
  }, [navigate]);

  const menuItems = useMemo(() => ([
    {
      text: 'Escritorio',
      icon: 'user',
      onClick: navigateToEscritorio
    },
    {
      text: 'Cerrar Sesión',
      icon: 'runner',
      onClick: signOut
    }
  ]), [navigateToProfile, signOut]);

  const dropDownButtonAttributes = {
    class: 'user-button'
  };

  const buttonDropDownOptions = {
    width: '150px'
  };

  return (


    <>
   
    <div className='user-panel'>
      
      {menuMode === 'context' && (
        <DropDownButton
            text={UsuarioLogin.nombre}
            stylingMode='text'
            icon={UsuarioLogin.avatarUrl}
            showArrowIcon={false}
            elementAttr={dropDownButtonAttributes}
            dropDownOptions={buttonDropDownOptions}
            items={menuItems}>
        </DropDownButton>
      )}
      {menuMode === 'list' && (
        <List items={menuItems} />
      )}
    </div>
    </>
  );
}
