import React, { useEffect } from 'react';
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
   mensaje:"Pago no validado",
   estatusAceptadoRechazado:false
},

{ 
   idEstatusAspirante:7,
   mensaje:"Elegible para certificar",
   estatusAceptadoRechazado:true
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
   mensaje:"Pago de derechos"
},

{ 
   idEstatusAspirante:4,
   mensaje:"Agenda evaluación",
}

]



const Semaforo=({estatusAceptadoRechazado,mensaje})=>{
  
  const color= estatusAceptadoRechazado?"text-success":"seguimientoRechazado";

   return(
    <>
        <div className='col-3'>
          <div className={color} style={{ fontSize: "12px",fontWeight:800}}>
            <center>
           { estatusAceptadoRechazado?(
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
             ):(

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
             )
           }
            <div className='p-1'></div>
              &nbsp;{mensaje}
               </center>
            </div>

       </div>
    </>
   );
}


const SemaforoNormal=({mensaje})=>{


    return(
      <>
       <div className='col-sm-3'>
          <div style={{ fontSize: "10px",fontWeight:500}}>
             <center>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
         </svg>
          <div className='p-1'></div>
          {mensaje}
           </center>
          </div>
          </div>
       </>
    );
}



const MensajeComponent=()=>{

  return(
   <div>
  
  </div>

  );

}


const MensajeComponent1=()=>{

  return(
   <div className='alert alert-success borderAlert'>
       <span style={{color:"#000000"}}>¡Gran trabajo, has concluido tu registro en la plataforma!</span>
      <div style={{color:"#000000"}}>
      Para continuar con tu proceso, complementa los documentos necesarios en la sección <span
       style={{  cursor: 'pointer', textDecoration: 'underline' }}
      >Mi expediente</span>
      </div>
  </div>

  );

}

const MensajeComponent2=()=>{

  return(
   <div className='alert alert-warning'>
     <span style={{color:"#000000"}}> Aún tienes documentos pendientes de validar en tu expediente…</span>
      <div style={{color:"#000000"}}>
        Para continuar con tu proceso, es necesario que todos los documentos se encuentren validados en la sección <span 
       style={{  cursor: 'pointer', textDecoration: 'underline' }}
      >Mi expediente</span>

      </div>
  </div>

  );

}


const MensajeComponent3=()=>{

  return(
   <div className='alert alert-warning'>
     <span style={{color:"#000000"}}> Tienes </span><span style={{color:"#E66929"}}>documentos no validados</span><span style={{color:"#000000"}}> en tu expediente…</span>
      <div style={{color:"#000000"}}>

      Para continuar con tu proceso, actualiza los documentos necesarios en la sección <span 
       style={{  cursor: 'pointer', textDecoration: 'underline' }}
      >Mi expediente</span>

      </div>
  </div>

  );

}



export const Titulo=(props)=>{

   const {estatus}=props;

    

    let array={semaforo:[],Mensaje:MensajeComponent};


       switch (estatus) {
         case 1:
          array= {semaforo:[{element:data[0],idTipo:1},{element:dataNormal[0],idTipo:2}],
                  Mensaje:MensajeComponent1
                 };
         break;
         case 2:
            array={semaforo:[{element:data[0],idTipo:1},{element:dataNormal[1],idTipo:2}],
                  Mensaje:MensajeComponent2
                 };
         break;
         case 3:
            array={semaforo:[{element:data[0],idTipo:1},{element:data[4],idTipo:1}],
                  Mensaje:MensajeComponent3
                 };
         break;
         case 4:
            array={semaforo:[{element:data[0],idTipo:1},{element:data[1],idTipo:1},{element:dataNormal[2],idTipo:2}],
                  Mensaje:MensajeComponent1
                 };
         break;
         case 5:
            array={semaforo:[{element:data[0],idTipo:1},{element:data[1],idTipo:1},{element:data[5],idTipo:1}],
                  Mensaje:MensajeComponent2
                 };
         break;
         case 6:
             array={semaforo:[{element:data[0],idTipo:1},{element:data[1],idTipo:1},{element:data[2],idTipo:1},{element:dataNormal[3],idTipo:2}],
                  Mensaje:MensajeComponent3
                 };
         break;
          case 7:
             array={semaforo:[{element:data[0],idTipo:1},{element:data[1],idTipo:1},{element:data[2],idTipo:1},{element:data[3],idTipo:1}],
                  Mensaje:MensajeComponent1
                 };
         break;

           case 8:
             array={semaforo:[{element:data[6],idTipo:1}],
                  Mensaje:MensajeComponent2
                 };
         break;
      
       }

  
  
 // default:
  





 return(
  <>
     <div className='row'>
        <div className='col-8'>
          <div className='row'>
           <div className='col-12'>
            <p  className='titularesVerde24'>
               Educación Media Superior
               </p>
           </div>
          </div>
           <div className='row'>
            <div className='col-12'>

              <div className='row'>

                    { array.semaforo.map(data=>{
                         
                       return(

                        <>
                      
                           {data.idTipo==1?(
                            <Semaforo estatusAceptadoRechazado={data.element.estatusAceptadoRechazado} mensaje={data.element.mensaje} ></Semaforo>
                           ):(
                            <SemaforoNormal mensaje={data.element.mensaje}></SemaforoNormal> 
                           )
                           }
                          
                       </>



                       );

                      }
                   )            



                   } 





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
            <div style={{ fontSize: "15px",fontWeight:600
            }}>
                  {/*  ¡Gran trabajo, has obtenido... */} 
             <div className='p-1'></div>
            <array.Mensaje></array.Mensaje>
            
            <div className='p-1'></div>
            </div>
        </div>

     </div>
  </>
 );

}