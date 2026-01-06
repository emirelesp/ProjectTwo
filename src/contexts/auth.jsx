import React, { useState, useEffect, useCallback, createContext } from 'react';
import { getUser, signIn as sendSignInRequest } from '../api/auth';
import { useDispatch } from 'react-redux';
import {setUsuarioLogin} from "../reduxUser/SegmentoUsuario"

const apiURL_Subdominio=import.meta.env.VITE_WebApi_URL;

const AuthContext = createContext({ loading: false });

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const AsignarReduxUserLogin = useDispatch(); 

  useEffect(() => {
    (async function () {


     
      const result = await getUser();

      

      if (result.isOk) {
        setUser(result.data);
        AsignarReduxUserLogin(setUsuarioLogin(result.data));
       
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (email, password) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      setUser(result.data);
      AsignarReduxUserLogin(setUsuarioLogin(result.data));
    }

    return result;
  }, []);

  const signOut = useCallback(async () => {
    
    
     ///////////////////
 
     const respuesta = await fetch(apiURL_Subdominio+'/logout', {
           method: "POST", // o POST según tu método
            credentials: 'include', // 🔑 esto envía la cookie al servidor

      });
    

    setUser(undefined);
       AsignarReduxUserLogin(setUsuarioLogin(

    {
    idIdentity:"",
    email:"",
    nombre:"",
    idSede:0,
    avatarUrl:"",
    rol : "",
    idrol : "",
    idAspirante: 0,
    curp :"" 
    //otros parametros
  }

       ));
  
  }, []);


  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
  );
}

export {
  AuthProvider,
  AuthContext,
};
