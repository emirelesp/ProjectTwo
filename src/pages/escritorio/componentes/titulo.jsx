import React from 'react';
import { Button } from 'devextreme-react';


/**
 * 
 * @param {true.-si es valido
 *         false.-si es rechazado  } estatusAceptadoRechazado 
 * @param {es el mensaje de cada estatus} mensaje 
 * @returns 
 */

const data =[
{ 
   idEstatusAspirante:1,
   mensaje:"Usuario Registrado",
   estatusAceptadoRechazado:true
},
{ 
   idEstatusAspirante:2,
   mensaje:"Expediente validado",
   estatusAceptadoRechazado:true
},

{ 
   idEstatusAspirante:3,
   mensaje:"Pago validado",
   estatusAceptadoRechazado:true
},

{ 
   idEstatusAspirante:4,
   mensaje:"Evaluación agendada",
   estatusAceptadoRechazado:true
},

{ 
   idEstatusAspirante:5,
   mensaje:"Expediente con observaciones",
   estatusAceptadoRechazado:false
},

{ 
   idEstatusAspirante:6,
   mensaje:"Pago no valido",
   estatusAceptadoRechazado:false
},


];



const dataNormal =[
{ 
   idEstatusAspirante:1,
   mensaje:"Expediente en conformación"
},
{ 
   idEstatusAspirante:2,
   mensaje:"Expediente en validación"
},

{ 
   idEstatusAspirante:3,
   mensaje:"Pago de derechos",
   estatusAceptadoRechazado:true
},

{ 
   idEstatusAspirante:4,
   mensaje:"Agenda de evaluación",
   estatusAceptadoRechazado:true
},

{ 
   idEstatusAspirante:5,
   mensaje:"Expediente con observaciones",
   estatusAceptadoRechazado:false
},

{ 
   idEstatusAspirante:6,
   mensaje:"Pago no valido",
   estatusAceptadoRechazado:false
},


]



const semaforo=(estatusAceptadoRechazado,mensaje)=>{
  
  const color= estatusAceptadoRechazado?"text-success":"text-danger";

   return(
    <>
        <div className='col-sm-3'>
          <div className={color} style={{ fontSize: "10px",fontWeight:500}}>

           { estatusAceptadoRechazado?(
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
             ):(

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
               <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
              </svg>
             )
           }
            <div className='p-1'></div>
              &nbsp;{mensaje}
            </div>
       </div>
    </>
   );
}


const semaforoNormal=(mensaje)=>{

    return(
      <>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
         </svg>
          <div className='p-1'></div>
          {mensaje}
       </>
    );
}




export const Titulo=(props)=>{

   const {estatus}=props;


 return(
  <>
     <div className='row'>
        <div className='col-8'>
          <div className='row'>
           <div className='col-12'>
            <p style={{ fontSize: "18px",fontWeight:700}}>
               Educación Media Superior
               </p>
           </div>
          </div>
           <div className='row'>
            <div className='col-12'>

              <div className='row'>


              </div>

             <div className='p-2'></div>
            </div>
           </div>
        </div>
         <div className='col-4'>
          <div className='row'>
           <div className='col-6'>
          {/*  <Button
              className={'profile-button-out_1'}
              text="Ver certificado"
              type="normal"
              stylingMode="contained"
         // icon="edit"
         // onClick={onEditar}
           />
           </div>
             <div className='col-6'>
           <Button
              className={'profile-button-out_1'}
              text="Aplicar"
              type="normal"
              stylingMode="contained"
            // icon="edit"
             // onClick={onEditar}
           /> */}
           </div>

          </div>
        </div>
     </div>
     <div className='row'>
        <div className='col-12'>
            <div style={{ fontSize: "15px",fontWeight:600,height:"25px",backgroundColor:"#ced4da",
            }}>
                  {/*  ¡Gran trabajo, has obtenido... */} 
            </div>
        </div>

     </div>
  </>
 );

}