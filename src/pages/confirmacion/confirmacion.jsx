import React, { useState } from 'react';
import './confirmacion.scss';
import MensajeConfirmacion from './popup/mensajeConfirmacion';

export function Confirmacion() {

     const [mensaje, setMensaje] = useState(true);


  return (
    <React.Fragment>
          <MensajeConfirmacion isVisible={mensaje} setisVisible={setMensaje}></MensajeConfirmacion>
    </React.Fragment>
   )}
