import TabPanel from 'devextreme-react/tab-panel';
import FileUploader from 'devextreme-react/file-uploader';
import { setValidarDocumento, setRechazarDocumento } from './service/expedienteApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const apiExamen=import.meta.env. VITE_WebApi_URL;


import Form, {ButtonItem, ButtonOptions, Item} from 'devextreme-react/form';



function ListaDocumentos(docs) 
{

    const {documentos, setDocumentos,direccionTab} = docs;
    const [motivoRechazo, setMotivoRechazo] = useState({idAspiranteDocumento:0, idRol:'0', motivo:''});  
    const usr = useSelector((state) => state.UsuarioLogin);

     const resultadoCarga = (e) => 
     {
        debugger;
        const data = JSON.parse(e.request.response)
        //const usr = useSelector((state) => state.UsuarioLogin);
        let estatusDoc=-1
   
        if(usr.rol === "Escolares") estatusDoc=1;
            
        const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === data.idAspiranteDocumento ? {
          ...p, documentoStr : data.documentoStr, estatusDocumento : estatusDoc} : p);

        setDocumentos(documentosActualizado);
 
        
      
     }

     async function validarDocumento (_idAspiranteDocumento, idRol)
     {
         var resultado = await setValidarDocumento(_idAspiranteDocumento, idRol)

         if(resultado > 0){
            const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === _idAspiranteDocumento ? {
            ...p, estatusDocumento : 1} : p);
            
            setDocumentos(documentosActualizado);
        }
     }

     const rechazarDocumento = (async (e) =>
     {
        e.preventDefault();
        var resultado = await setRechazarDocumento(motivoRechazo)
         
         if(resultado > 0){
            const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === motivoRechazo.idAspiranteDocumento ? {
            ...p, estatusDocumento : 0, observacion : motivoRechazo.motivo} : p);
            
            setMotivoRechazo({idAspiranteDocumento:0, idRol:'0', motivo:''});
            setDocumentos(documentosActualizado);
      
         }
     });

     const mostrarDocumento = ({data}) => {
       // const usr = useSelector((state) => state.UsuarioLogin);
         
        const src = data.documentoStr;
        const d = motivoRechazo;
        d.idAspiranteDocumento = data.idAspiranteDocumento;
        d.idRol = usr.idrol;
        setMotivoRechazo(d);    
         
        return(
            <>
            <h6>
                {data.estatusDocumento == -1 && data.documentoStr != '' ?
                    <span className='documentoPorValidar'>
                        <i className='bi bi-clipboard2-fill'></i>
                        <span>  Documento por validar</span>
                    </span>
                    :
                    data.estatusDocumento == 0 ?
                    <>
                        <span className='documentoRechazado'>
                            <i className='bi bi-clipboard2-x-fill'></i>
                            <span>  Documento con observaciones</span>
                        </span>
                        <br/>
                        <p>Observación: {data.observacion}</p>
                    </>
                    :
                    data.estatusDocumento == 1 ?
                    <span className='documentoValidado'>
                        <i className='bi bi-clipboard2-check-fill'></i>
                        <span>  Documento validado</span>
                    </span>
                    :
                    <span className='documentoPorValidar'>
                        <i className='bi bi-clipboard2-fill'></i>
                        <span>  Documento pendiente de subir</span>
                    </span>
                }

            </h6>
            {data.estatusDocumento <= 0 ?
                <FileUploader
                    selectButtonText='Selecciona el archivo que deseas cargar'
                    labelText='o arrastra aquí'
                    uploadUrl={apiExamen+"/api/AspiranteDocumento/CargaDocumento"}
                    multiple={false}
                    uploadMode='instantly'
                    accept='.jpg,.pdf'
                    name='file'
                    uploadCustomData={{idAspiranteDocumento: data.idAspiranteDocumento, idRol:usr.idrol}}
                    onUploaded={resultadoCarga}
                    >
                </FileUploader>
                :
                <p>.</p>
            }
            <hr></hr>
            {data.estatusDocumento == -1 && data.documentoStr.length > 0 && usr.rol === "Escolares" ? 
                <>
                    <button className='buttonCona btn-sm' onClick={() => validarDocumento(data.idAspiranteDocumento, '61E7BFF4-248B-4BE8-B235-4376045120D1')}><span className='bi bi-clipboard2-check-fill'>  Validar documento</span></button>
                    <br/>
                    <form onSubmit={rechazarDocumento}>
                    <Form formData={motivoRechazo} labelLocation='left'>
                        
                        <Item dataField = "motivo" editorType="dxTextBox"
                            editorOptions={{maxLength:100, showClearButton:true}}
                            validationRules={[{type:'required', message:'La descripción del rechazo es un dato obligatorio'}]}>
                        </Item>
                        <ButtonItem horizontalAlignment='left'
                                    buttonOptions={{
                                        text:"Rechazar",
                                        icon:"close",
                                        //classCss:"buttonCona btn-sm",
                                        elementAttr:{style: "font-family: 'Lato', sans-serif !important; font-size: 11px !important;background-color:#007E67; color:#fff; border-radius:7px; padding:5px;"},
                                        useSubmitBehavior:true
                                    }}> 
                            
                        </ButtonItem>
                    </Form>
                    </form>
                </>
                :
                data.estatusDocumento == 0 && data.documentoStr.length > 0 && usr.rol === "Escolares" ?
                <>
                    <button className='buttonCona btn-sm' onClick={() => validarDocumento(data.idAspiranteDocumento, usr.idrol)}><span className='bi bi-clipboard2-check-fill'>  Validar documento</span></button>
                </>
                :
                <span></span>
            }
            {data.documentoStr.length > 0 ?
                <iframe src={src} style={{width:'100%', height:'100%', border:'none'}}></iframe>
                :
                <p>.</p>            
            }
            </>
            
        )
     } 

     return(
        <>
            <TabPanel
            width="100%"
            height="auto"
            animationEnabled={true}
            swipeEnabled={true}
            dataSource={documentos}
            showNavButtons={true}
            scrollingEnabled={true}
            tabsPosition={direccionTab}
            iconPosition='top'
            itemComponent={mostrarDocumento}
            itemTitleRender={(item) => (
                <span className={item.classCss}>
                    <i className='dx-icon dx-icon-pdffile' />
                    {item.title}
                </span>
            )}   

             elementAttr={{ class: "tabDocumentos" }}  
            />
        </>
    )
}

export default ListaDocumentos