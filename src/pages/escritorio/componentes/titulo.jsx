import React from 'react';
import { Button } from 'devextreme-react';

export const Titulo=()=>{

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

           {/*   <div className='text-success' style={{ fontSize: "10px",fontWeight:500}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
              &nbsp; Elegible para certificar
            </div>  */}
              
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