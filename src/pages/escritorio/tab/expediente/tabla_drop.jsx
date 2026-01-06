import React, { useState } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import Up from './popup/up';
import ViewPDF from './popup/viewPDF';


const data = [
  { id: 1, documento: 'CURP', tipo: 'Requisito de Expediente', estatus: 'Pendiente' },
  { id: 2, documento: 'Certificado de Secundaria', tipo: 'Requisito de Expediente', estatus: 'Aprobado' },
  { id: 3, documento: 'Comprobante de Pago', tipo: 'Requisito de Expediente', estatus: 'Rechazado' },
];

export  function GridExpediente() {

  const [isVisibleUp,setisVisibleUp]=useState(false);
   const [isVisiblePDF,setisVisiblePDF]=useState(false);



  return (

    <>
    <Up isVisible={isVisibleUp} setisVisible={setisVisibleUp} ></Up>
    <ViewPDF isVisiblePDF={isVisiblePDF} setisVisiblePDF={setisVisiblePDF} ></ViewPDF>
  
    <div style={{ padding: 20 }}>
      <div style={{ fontSize: "20px",fontWeight:700}}>Mi expediente</div>
      <div className='p-2'></div>
      <DataGrid
        dataSource={data}
        keyExpr="id"
        showBorders={true}
      >
        <Column dataField="documento" caption="Documentos" />
        <Column dataField="tipo" caption="Tipo" />
        <Column dataField="estatus" caption="Estatus" />

        {/* Columna de acciones personalizada */}
        <Column
          caption="Acciones"
          cellRender={(cellData) => (
            <div>

              <button
                className="btn"
                onClick={() => {
                  
                  setisVisibleUp(true);
                //  alert(`subir: ${cellData.data.documento}`)
                
                }

              }
               >
               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
              </svg> 
              </button>
              <button
                className="btn"
                onClick={() =>{
                  
                  
                 setisVisiblePDF(true);
                }
              
              }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-files" viewBox="0 0 16 16" color='blue'>
                  <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
                </svg>
              </button>
        
             <button
                className="btn"
                onClick={() => alert(`ver: ${cellData.data.documento}`)}
              >
             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16" color='green'>
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            </button>


            </div>
          )}
        />
      </DataGrid>
    </div>
    </>
  );
}
