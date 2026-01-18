import TabPanel from 'devextreme-react/tab-panel';
import FileUploader from 'devextreme-react/file-uploader';
import { setValidarDocumento, setRechazarDocumento } from './service/expedienteApi';
import { useSelector } from 'react-redux';

function ListaDocumentos(docs) 
{
    const {documentos, setDocumentos,direccionTab} = docs;
    
    const UsuarioLogin = useSelector((state) => state.UsuarioLogin);


    

     const resultadoCarga = (e) => 
     {
        const data = JSON.parse(e.request.response)
        
        const documentosActualizado = documentos.map(p => p.idAspiranteDocumento === data.idAspiranteDocumento ? {
            ...p, documentoStr : data.documentoStr} : p);
            
        setDocumentos(documentosActualizado);
     }



     const mostrarDocumento = ({data}) => {
        
        const src =  data.documentoStr; ///'data:application/pdf;base64,' 
        
          
        return(
            <>
            {/* <h6>{data.documento}</h6> */}
            {data.estatusDocumento<=0 ?
                <FileUploader
                    selectButtonText='Selecciona el archivo que deseas cargar'
                    labelText='o arrastra aquí'
                    uploadUrl="https://localhost:7029/api/AspiranteDocumento/CargaDocumento"
                    multiple={false}
                    uploadMode='instantly'
                    name='file'
                    uploadCustomData={{idAspiranteDocumento: data.idAspiranteDocumento,
                         idRol:UsuarioLogin.idrol}}
                    onUploaded={resultadoCarga}
                    >
                </FileUploader>
                :
                <p></p>
            }
         
           {/*  {!data.estatusDocumento && data.documentoStr.length > 0 ? 
                <button onClick={() => validarDocumento(data.idAspiranteDocumento, '9b560534-ded3-45b6-ac6a-d07e2757f527')}>Validar documento</button>
                :
                <button onClick={() => rechazarDocumento(data.idAspiranteDocumento, '9b560534-ded3-45b6-ac6a-d07e2757f527')}>Rechazar documento</button>
            } */}
            {data.documentoStr.length > 0 ?
                <iframe src={src} width={"100%"} height={400}></iframe>
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
            height="100%"
            animationEnabled={true}
            swipeEnabled={true}
            dataSource={documentos}
            tabsPosition={direccionTab}
            iconPosition='top'
            itemComponent={mostrarDocumento}      
            />
        </>
    ) 
}

export default ListaDocumentos