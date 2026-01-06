import { configureStore } from '@reduxjs/toolkit';
import usuarioSlice_reducer  from './SegmentoUsuario';

export const GetUserLogin = configureStore({
  reducer: {
    UsuarioLogin: usuarioSlice_reducer,
  },
});