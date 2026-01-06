import { createSlice } from '@reduxjs/toolkit';

export const usuarioSlice = createSlice({
  name: 'UsuarioLogin',
  initialState: {
    idIdentityUser:"",
    email:"",
    nombre:"",
    idSede:0,
    avatarUrl:"",
    rol : "",
    idrol : "",
    idAspirante: 0,
    curp : ""
    
    //otros parametros
  },

  
  ////funciones
  reducers: {
    setUsuarioLogin: (state, action) => {
            state.idIdentityUser=action.payload.idIdentityUser;
            state.email=action.payload.email;
            state.nombre=action.payload.nombre;
            state.idSede=action.payload.idSede;
            state.avatarUrl=action.payload.avatarUrl;

            state.rol=action.payload.rol;
            state.idrol=action.payload.idrol;
            state.idAspirante=action.payload.idAspirante;
            state.curp=action.payload.curp;
            
        },
  },
});

export const {setUsuarioLogin} = usuarioSlice.actions;
export default usuarioSlice.reducer  ;/// este es el valor que se asigna por default