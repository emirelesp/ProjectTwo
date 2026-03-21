import React, { useCallback, useEffect, useState } from 'react';
import { Titulo } from '../../componentes/titulo';
import ListaDocumentos from './ListaDocumentos';
import { getDocumento, getDocumentosAspirante, getPagosAspirante } from './service/expedienteApi';
import getSizeVentana from '../../componentes/getSizeVentana';
import { LoadPanel } from 'devextreme-react';
import { useSelector } from 'react-redux';
//import { GridExpediente } from './Tabla';




export default function Expediente(props){

 const {seguimientoAspirante,tab,setMensaje,mensajes}=props;


    const [dataDocumentos, setDataDocumentos] = useState({ });
   // const { width, height } = getSizeVentana();
    const [dataDireccionTab, setDataDireccionTab] = useState("left");//top
    const [loading, setLoading] = useState(false);//top


    const [indexDocumento,setIndexDocumento]=useState(0);

    const UsuarioLogin = useSelector((state) => state.UsuarioLogin);
   

      


    const mostrarDocumentos =useCallback( async() =>
    {
      setLoading(true);

     
        const documentos = await getDocumentosAspirante(UsuarioLogin.idAspirante);
       const pagos = await getPagosAspirante(UsuarioLogin.idAspirante);
   
       const union=[...pagos,...documentos];
       let Aspirantedocumento = union.find(u => u.idAspiranteDocumento ===indexDocumento);
      if (Aspirantedocumento) {
          const docsrc= await getDocumento(indexDocumento);
          Aspirantedocumento.documentoStr = docsrc[0].text;
      }
     
        setDataDocumentos(union);
        setLoading(false);
    
        //setVisiblePopupDocumentos(true);

    },[indexDocumento]);

    const mostrarPagos =useCallback( async(aspirante) =>
    {
       // const pagos = await getPagosAspirante(UsuarioLogin.idAspirante);
        //setDataDocumentos(documentos);
       // setDataPagos(pagos);
      //  setVisiblePopupPagos(true);
    },[]);


    useEffect(()=>{
     mostrarDocumentos();

    },[mensajes]);


/*     useEffect(()=>{
      debugger;
      if(width<768){
        setDataDireccionTab("top");
      }else {setDataDireccionTab("left");}

    },[width]); */




  return (
    <>
      <LoadPanel
                visible={loading}
              
                showPane={true}
                showIndicator={true}
                shading={true}
                shadingColor="rgba(0,0,0,0.4)"
                height={100}
                width={250}
                message="Cargando Documentos..."
                indicatorSrc="https://js.devexpress.com/Content/data/loadingIcons/rolling.svg"
            />
   
    <React.Fragment>
         


      <div style={{margin: "10px"}}>


       
      
       <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
   
         <div className='row'>

          <ListaDocumentos documentos={dataDocumentos} setDocumentos = {setDataDocumentos} 
          direccionTab={dataDireccionTab} setMensaje_={setMensaje}
          indexDocumento={indexDocumento} setIndexDocumento={setIndexDocumento}>
           </ListaDocumentos>
        {/*    <GridExpediente>
           </GridExpediente> */}
         </div>
       </div>
    </React.Fragment>
    </>
  );


}