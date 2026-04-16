
import notify from 'devextreme/ui/notify';
import React, { useCallback, useEffect, useState, useRef } from "react";
import Popup from "devextreme-react/popup";
import LoadIndicator from 'devextreme-react/load-indicator';
import { useSelector } from 'react-redux';
import { getDictamenResultados} from '../service/practicaApi';



const DictamenResultados = (props) => {


 const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

const[pdf,setPDF]=useState({base64:''});
const[loading,setLoading]=useState(false);
const {isVisible,setisVisible}=props;








const pdfcallback=useCallback(async ()=>{


setLoading(true);
const resultado=await getDictamenResultados(UsuarioLogin.idAspirante);
setPDF(resultado);
setLoading(false);


},[UsuarioLogin.idAspirante]);


 
useEffect(()=>{

pdfcallback();


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


