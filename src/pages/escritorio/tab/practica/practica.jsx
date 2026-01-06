import React from 'react';
import ExamenPractica from './componente/pregunta';
import { Temporizador } from './componente/temporizador';


export default function Practica(){


  return (
    <React.Fragment>
     <Temporizador segundos={10} />
      <ExamenPractica></ExamenPractica>


    </React.Fragment>
  );


}



