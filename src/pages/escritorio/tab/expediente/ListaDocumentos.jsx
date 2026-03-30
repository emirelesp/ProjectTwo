import TabPanel from 'devextreme-react/tab-panel';
import FileUploader from 'devextreme-react/file-uploader';
import { setValidarDocumento, setRechazarDocumento, getDocumento } from './service/expedienteApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const apiExamen=import.meta.env. VITE_WebApi_URL;


import Form, {ButtonItem, ButtonOptions, Item} from 'devextreme-react/form';


import contratoAdhesion from '../../../../assets/contrato_adhesion.pdf';
import cartaCompromiso from '../../../../assets/carta_compromiso.pdf';


function ListaDocumentos(docs) 
{

    const {documentos, setDocumentos,direccionTab,setMensaje_,indexDocumento,setIndexDocumento} = docs;
    const [motivoRechazo, setMotivoRechazo] = useState({idAspiranteDocumento:0, idRol:'0', motivo:''});  
    const usr = useSelector((state) => state.UsuarioLogin);


     const resultadoCarga = (e) => 
     {
        
    /*     const data = JSON.parse(e.request.response)
    
        let estatusDoc=-1
   
        if(usr.rol === "Escolares") estatusDoc=1;
            
        const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === data.idAspiranteDocumento ? {
          ...p, documentoStr : data.documentoStr, estatusDocumento : estatusDoc} : p);

        setDocumentos(documentosActualizado); */


        setMensaje_(Date.now());
        
      
     }

     async function validarDocumento (_idAspiranteDocumento, idRol)
     {
         var resultado = await setValidarDocumento(_idAspiranteDocumento, idRol)

         if(resultado > 0){
            const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === _idAspiranteDocumento ? {
            ...p, estatusDocumento : 1, classCss: "documentoValidado"} : p);
            
            setDocumentos(documentosActualizado);
        }
     }

     async function validarPagoAcuerdo (_idAspiranteDocumento, idRol)
     {
        var resultado = await setValidarDocumento(_idAspiranteDocumento, idRol, usr.idIdentityUser, "Validado por acuerdo SEG")

         if(resultado > 0){
            const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === _idAspiranteDocumento ? {
            ...p, estatusDocumento : 1} : p);
            
            setDocumentos(documentosActualizado);
        }
     }

     async function validar (_idAspiranteDocumento, idRol)
     {
          
        var resultado = await setValidarDocumento(_idAspiranteDocumento, 
                                                                  idRol,                          //'61E7BFF4-248B-4BE8-B235-4376045120D1'
                                                     usr.idIdentityUser,
                                                      "He leído y acepto");

         var _usuario = "Leído y aceptado por " + usr.email + " (" + usr.rol + ")";

                                             
         if(resultado > 0){
            const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === _idAspiranteDocumento ? {
            ...p, estatusDocumento : 1, classCss  : "documentoValidado", usuario : _usuario} : p);
            
            setDocumentos(documentosActualizado);
            setMensaje_(Date.now());
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

    const seleccionTab = async(e) => 
     {
      
        setIndexDocumento(e.addedItems[0].idAspiranteDocumento);
    
        let aspiranteDocumento = documentos.find(d => d.idAspiranteDocumento === e.addedItems[0].idAspiranteDocumento)

        if(aspiranteDocumento.documentoStr.length == 0 && aspiranteDocumento.idDocumento != 4 && aspiranteDocumento.idDocumento != 7) 
        {
            var resultado = await getDocumento(e.addedItems[0].idAspiranteDocumento);

            if(resultado[0].text.length > 0)
            {
                const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === e.addedItems[0].idAspiranteDocumento ? {
                ...p, documentoStr:resultado[0].text} : p);
                
                setDocumentos(documentosActualizado);
            }
         }
     }

        // funcion que valida el tamaño maximo permitido
     const handleValueChanged = (e) =>
     {
        const maxFileSize = 2 * 1024 * 1024;
        const files = e.value;
        if(files.length > 0)
        {
            const file = files[0];
            if(file.size > maxFileSize)
            {
                alert("El archivo supera el tamaño máximo permitido de 2 MB");
                e.component.reset();
            }
        }
     };

     const mostrarDocumento = ({data}) => {
    
        const src = data.documentoStr;
        
        const d = motivoRechazo;
        d.idAspiranteDocumento = data.idAspiranteDocumento;
        d.idRol = usr.idrol;
        setMotivoRechazo(d);

        return(
            <>
            <h6 style={{paddingLeft:'15px'}}>
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
                    data.estatusDocumento == 1 && (data.idDocumento == 4 || data.idDocumento == 7||data.idDocumento == 8) ?
                    <>
                    {/* estatus de documentos validados */}
                    <span className='documentoValidado'>
                        <i className='bi bi-clipboard2-check-fill'></i>
                        <span>  Documento validado</span>
                    </span>
                    <br/>
                    <br/>
                    {/* descripción del usuario quien valido */}
                    <span>{data.usuario}</span>
                    <br/>
                    </>
                    :
                    data.estatusDocumento == 1 && (data.idDocumento != 4 || data.idDocumento != 7) ?
                    <span className='documentoValidado'>
                        {/* estatus de documentos cargados */}
                        <i className='bi bi-clipboard2-check-fill'></i>
                        <span>  Documento validado</span>
                    </span>                    
                    :   // segemento para cambiar el estatus del documento
                    data.estatusDocumento == -1 && (data.idDocumento == 4 || data.idDocumento == 7) ?
                    <span className='documentoPorValidar'>
                        <i className='bi bi-clipboard2-fill'></i>
                        <span>  Documento pendiente de validar</span>
                    </span>
                    :
                    <span className='documentoPorValidar'>
                        <i className='bi bi-clipboard2-fill'></i>
                        <span>  Documento pendiente de subir</span>
                    </span>
                }

            </h6>
            
            <div style={{whiteSpace: "pre-line",paddingLeft:'15px'}}>
                {data.descripcion}
            </div>
            {
                data.idDocumento==1?(
                     <div className='p-1'>
                        <img src='/detallefoto.jpeg' width='240px'>
                        </img>
                    </div>
                ):(<></>)
            }



            
            {/* validación para no mostrar fileUploader */}        
            {data.estatusDocumento <= 0 && data.idDocumento != 4 && data.idDocumento != 7 ?
                <>
                <FileUploader
                    selectButtonText='Selecciona el archivo que deseas cargar'
                    labelText='o arrastra aquí'
                    uploadUrl={apiExamen+"/api/AspiranteDocumento/CargaDocumento"}
                    multiple={false}
                    uploadMode='instantly'
                    accept='.jpg,.pdf,.png'  // se incluyó PNG
                    name='file'
                    onValueChanged={handleValueChanged}  // validar peso máximo
                    uploadCustomData={{idAspiranteDocumento: data.idAspiranteDocumento, idRol:usr.idrol}}
                    onUploaded={resultadoCarga}
                    >
                </FileUploader>
                <p style={{whiteSpace: "pre-line",paddingLeft:'15px'}}>Son permitidos archivos máximo de 2 MB (formato pdf, jpg o png)</p> {/* especificacion de archivos */}
                </>
                :
                <div></div>
            }
            <hr></hr>
            {data.estatusDocumento == -1 && data.documentoStr.length > 0 && usr.rol === "Escolares" ? 
                <>
                    <button className='buttonCona btn-sm btn btn-success' onClick={() => validarDocumento(data.idAspiranteDocumento, '61E7BFF4-248B-4BE8-B235-4376045120D1')}><span className='bi bi-clipboard2-check-fill'>  Validar documento</span></button>
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
                                        elementAttr:{style: "font-family: 'Lato', sans-serif !important; font-size: 11px !important;background-color:#007E67; color:#fff; border-radius:7px; padding:5px;"},
                                        useSubmitBehavior:true
                                    }}> 
                            
                        </ButtonItem>
                    </Form>
                    </form>
                </>
                :
                data.estatusDocumento == -1 && data.documentoStr.length == 0 && data.idTipoDocumento == 2  && usr.rol === "Escolares" ?
                <>
                    <button className='buttonCona btn-sm btn btn-success' onClick={() => validarPagoAcuerdo(data.idAspiranteDocumento, usr.idrol)}><span className='bi bi-clipboard2-check-fill'>  Validar por Acuerdo SEG</span></button>
                </>
                :
                data.estatusDocumento == 0 && data.documentoStr.length > 0 && usr.rol === "Escolares" ?
                <>
                    <button className='buttonCona btn-sm btn btn-success' onClick={() => validarDocumento(data.idAspiranteDocumento, usr.idrol)}><span className='bi bi-clipboard2-check-fill'>  Validar documento</span></button>
                </>
                :
                <span></span>
            }
            {
                data.idDocumento == 4 && data.estatusDocumento == -1 ?
                <>
                {/*Se incluye carta compromiso */}
                <iframe src={cartaCompromiso} style={{width:'100%', height:'400px', border:'none'}}></iframe>
                <br/>
                <button className='buttonCona btn-sm btn btn-success' onClick={() => validar(data.idAspiranteDocumento, usr.idrol)}><span className='bi bi-clipboard2-check-fill'>  He leído y acepto</span></button>
                </>
                :
                data.idDocumento == 7 && data.estatusDocumento == -1 ?
                <>
                {/*Se incluye contrato */}
                <iframe src={contratoAdhesion} style={{width:'100%', height:'400px', border:'none'}}></iframe>
                <br/>
                <button className='buttonCona btn-sm btn btn-success' onClick={() => validar(data.idAspiranteDocumento, usr.idrol)}><span className='bi bi-clipboard2-check-fill'>  He leído y acepto</span></button>
                </>
                :
                data.documentoStr.length > 0 ?
                <iframe src={src} style={{width:'100%', height:'400px', border:'none'}}></iframe>
                :
                <div></div>            
            }
            </>
            
        )
     }
     
     
     return(
        <>
            <TabPanel
            width="100%"
            onSelectionChanged={seleccionTab}
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