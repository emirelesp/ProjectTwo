
import notify from 'devextreme/ui/notify';
import React, { useCallback, useEffect, useState, useRef } from "react";
import Popup from "devextreme-react/popup";
import LoadIndicator from 'devextreme-react/load-indicator';
import { useSelector } from 'react-redux';
import {  getCatalogoDictamenResultados, getConstanciaResultados } from '../service/practicaApi';
import { LoadPanel, SelectBox } from 'devextreme-react';
import { Document, Page ,pdfjs} from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
 "/pdf.worker.min.js",      // "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ConstanciaResultados = (props) => {


 const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

const[pdf,setPDF]=useState({base64:''});
const[loading,setLoading]=useState(false);
const[seleccionCatalogoCR,setSeleccionCatalogoCR]=useState([]);
const[seleccionCR,setSeleccionCR]=useState('0|2020-12-01|0');
const {isVisible,setisVisible}=props;





const CatalogoConstanciaResultadocallback=useCallback(async ()=>{

   const resultado=await getCatalogoDictamenResultados(UsuarioLogin.idAspirante);
   setSeleccionCatalogoCR(resultado);
},[UsuarioLogin.idAspirante]);


const pdfcallback=useCallback(async ()=>{

if(seleccionCR=='0|2020-12-01|0')return;
const valor_ = seleccionCR.split("|");  

setLoading(true);
const resultado=await getConstanciaResultados(UsuarioLogin.idAspirante, valor_[0],valor_[1],valor_[2]);

 const byteCharacters = atob(resultado.base64);
  const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
const blob = new Blob([byteArray], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);



setPDF(url);
setLoading(false);


},[UsuarioLogin.idAspirante,seleccionCR]);


 
useEffect(()=>{

pdfcallback();


},[UsuarioLogin.idAspirante, seleccionCR]);


useEffect(()=>{

CatalogoConstanciaResultadocallback();


},[UsuarioLogin.idAspirante]);



/**********************
 * 
 * PDf
 * 
 */

 const [numPages, setNumPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  const [scale, setScale] = useState(0.5);

    const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () =>
    setPageNumber(prev => (prev > 1 ? prev - 1 : prev));
  const goToNextPage = () =>
    setPageNumber(prev => (prev < numPages ? prev + 1 : prev));

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = "documento.pdf";
    link.click();
  };

  const zoomIn = () => setScale(s => s + 0.2);
  const zoomOut = () => setScale(s => (s > 0.4 ? s - 0.2 : s));


 /* *** */

   return (
    <div>
    {isVisible?(
      <Popup
  
        visible={isVisible}
        onHiding={() => {
          setisVisible(false);
          setSeleccionCR('0|2020-12-01|0');
          setPDF({base64:''});
        }}
        title={"Descargar dictamen"}
        width="90%"
    
        height="100%"
        showCloseButton={true}
        dragEnabled={false}
        
      >
   

   <>
  
     <SelectBox
      dataSource={seleccionCatalogoCR}
      displayExpr="text"   // qué atributo se muestra
      valueExpr="value"    // qué atributo se guarda como valor
      //defaultValue={0}     // valor inicial seleccionado
      onValueChanged={ (e)=>{
        setSeleccionCR(e.value)
         }
      }
    />

     <div className='p-1'></div>
    
    
    {seleccionCR!='0|2020-12-01'&&pdf?.base64!=''&&!loading?(
     /*  <iframe src={'data:application/pdf;base64,'+pdf?.base64}   style={{width:'100%',height:'100%'}}>
      </iframe>
 */
      <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
      <div style={{ marginBottom: "10px" }}>
        <button className='btn btn-default' onClick={goToPrevPage} disabled={pageNumber <= 1}>
          ◀ Página anterior
        </button>
        <span style={{ margin: "0 10px" }}>
          Página {pageNumber} de {numPages}
        </span>
        <button className='btn btn-default' onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Página siguiente ▶
        </button>

        <button className='btn btn-default' onClick={zoomOut} style={{ marginLeft: "20px" }}>➖ Zoom -</button>
        <button className='btn btn-default' onClick={zoomIn}>➕ Zoom +</button>

        <button className='btn btn-default' onClick={downloadPdf} style={{ marginLeft: "20px" }}>
          📥 Descargar PDF
        </button>
      </div>

      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} scale={scale}/>
      </Document>

  
    </div>


      
    ):(
      
       loading?(
                  <>

                  <div className='p-2'></div>
                  <center>
                  <LoadIndicator height={40} width={40} />
                  <p style={{ marginTop: 10 }}>Cargando...</p>
                  </center>
                  </>
       ):(<></>)
      )
  }
    
    
    


      
            
    </>   
           
    </Popup>
):(<></>)}
    </div>
  );
};

export default ConstanciaResultados;



    
    
   