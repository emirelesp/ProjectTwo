
import notify from 'devextreme/ui/notify';
import React, { useCallback, useEffect, useState, useRef } from "react";
import Popup from "devextreme-react/popup";
import LoadIndicator from 'devextreme-react/load-indicator';
import { useSelector } from 'react-redux';
import { getCatalogoDictamenResultados, getDictamenResultados} from '../service/practicaApi';
import { SelectBox } from 'devextreme-react';



const DictamenResultados = (props) => {


 const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

const[pdf,setPDF]=useState({base64:''});
const[loading,setLoading]=useState(false);
const {isVisible,setisVisible}=props;


const[seleccionCatalogoCR,setSeleccionCatalogoCR]=useState([]);
const[seleccionCR,setSeleccionCR]=useState('0|2020-12-01');



const CatalogoDictamencallback=useCallback(async ()=>{

   const resultado=await getCatalogoDictamenResultados(UsuarioLogin.idAspirante);
   setSeleccionCatalogoCR(resultado);
},[UsuarioLogin.idAspirante]);




const pdfcallback=useCallback(async ()=>{


if(seleccionCR=='0|2020-12-01')return;
const valor_ = seleccionCR.split("|");  
setLoading(true);
const resultado=await getDictamenResultados(UsuarioLogin.idAspirante,valor_[0],valor_[1]);
setPDF(resultado);
setLoading(false);


},[UsuarioLogin.idAspirante,seleccionCR]);


 
useEffect(()=>{

pdfcallback();


},[UsuarioLogin.idAspirante,,seleccionCR]);

useEffect(()=>{

CatalogoDictamencallback();


},[UsuarioLogin.idAspirante]);


   return (
    <div>
    {isVisible?(
      <Popup
  
        visible={isVisible}
        onHiding={() => {
          setisVisible(false);
         
        }}
        title={"Dictamen final"}
        width="80%"
    
        height="80%"
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

    
    
    {pdf?.base64!=''&&!loading?(
      <iframe src={'data:application/pdf;base64,'+pdf?.base64}   style={{width:'100%',height:'100%'}}>
      </iframe>):(
      
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

export default DictamenResultados;


