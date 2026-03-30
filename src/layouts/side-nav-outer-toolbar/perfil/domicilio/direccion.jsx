
import  { useEffect, useState } from 'react';
import Popup from 'devextreme-react/popup'
import Form, {ButtonItem, Item} from 'devextreme-react/form';
import Toast from 'devextreme-react/toast';
import { getMunicipios, regDomicilio } from './services/apiDireccion';
import notify from 'devextreme/ui/notify';

export function Direccion(props) 
{


    const {visiblePopup, setVisiblePopup, dataEstados, idAspirante, direccion1,setDireccion1} = props

   // const [direccion1, setDireccion1] = useState(direccion);

    const [dataMunicipios, setDataMunicipios] = useState({});
    const [visible, setVisible] = useState();
    const [mensaje, setMensaje] = useState();
    const [tipoMensaje, setTipoMensaje] = useState();
    const [formKey, setFormKey] = useState(0);

    const cerrarPopup = () =>
    {
        setFormKey(prev => prev + 1);
        setDireccion1({});
        setVisiblePopup(false);
      
    }

    const registrarDireccion = (async(e) =>{
        e.preventDefault();

     
        direccion1.idAspirante = idAspirante;


        const res = await regDomicilio(direccion1);

        if(res[0].value > 0)
        {
            cerrarPopup();
            notify(res[0].text, 'success', 5000);
          
           // setMensaje(res[0].text);
            //setTipoMensaje("success");
            //setVisible(true);
        }
        else{
           // setMensaje(res[0].text);
             notify(res[0].text, 'warning', 5000);
            //setTipoMensaje("warning");
           // setVisible(true);
        }
    });

    const cambioEstado = async(e) =>{
        if(e.value != null && e.value != undefined)
        {
            const municipios = await getMunicipios(e.value);
            setDataMunicipios(municipios);
        }
        else{
            setDataMunicipios({});
        }
    }

    const hideToast = () => {
        setVisible(false);
    }

    // useEffect(() => {
    //     if(visiblePopup && direccion.length > 0){
    //         setDireccion1({...direccion[0]});
    //         }
    //     else setDireccion1({idAspiranteDireccion:0, calle:'', numeroExterior:'', numeroInterior: '', colonia:'', codigoPostal:''})
    // }, [visiblePopup]);



    return(
        <>
        <Popup 
                    visible={visiblePopup}
                    onHiding={cerrarPopup}
                    showCloseButton={true}
                    showTitle={true}    
                    //title={ "Registrar Domicilio"}
                    width="100%"
                    maxWidth={"700px"}
                    height="100%"
                    maxHeight="665px"
                    //resizeEnabled={true}
                   // dragEnabled={true}
                    position={"center"}
                    >
                    <>
                    <div>Registro domicilio</div>
                    <form onSubmit={registrarDireccion}>
                    <Form formData={direccion1} validationGroup='frmAsp1' labelLocation='top'>
                        <Item dataField = "calle" editorType="dxTextBox"
                             editorOptions={{maxLength:70, showClearButton:true}}
                             validationRules={[{type:'required', message:'La calle es un dato obligatorio'}]}>
                        </Item>
                        <Item dataField = "numeroExterior" editorType="dxTextBox"
                              editorOptions={{maxLength:10, showClearButton:true}}
                              validationRules={[{type:'required', message:'El número exterior es un dato obligatorio'}]}>
                        </Item>
                        <Item dataField = "numeroInterior" editorType="dxTextBox"
                              editorOptions={{maxLength:10, showClearButton:true}}>
                        </Item>
                        <Item dataField = "colonia" editorType="dxTextBox"
                              editorOptions={{maxLength:70, showClearButton:true}}
                              validationRules={[{type:'required', message:'La colonia es un dato obligatorio'}]}>
                        </Item>
                        <Item dataField = "codigoPostal" editorType="dxTextBox" 
                            editorOptions={{showClearButton:true, mask:"00000", maskInvalidMessage:"Formato invalido", showMaskMode:"always"}}
                            validationRules={[{type:'required', message:'El código postal es un dato obligatorio'}]}>
                        </Item>
                        <Item dataField="idEstado" editorType='dxSelectBox' label={{text: "Estado"}}
                            editorOptions={{items:dataEstados, valueExpr:"value", displayExpr:"text", 
                                            searchEnabled:true, onValueChanged:cambioEstado, showClearButton:true}}
                            validationRules={[{type:'required', message:'El estado es obligatorio'}]}>
    
                        </Item>
                        <Item dataField="idMunicipio" editorType='dxSelectBox' label={{text: "Municipio"}}
                            editorOptions={{items:dataMunicipios, valueExpr:"value", displayExpr:"text", 
                                            searchEnabled:true, showClearButton:true}}
                            validationRules={[{type:'required', message:'El municipio es obligatorio'}]}>
    
                        </Item>
                        <ButtonItem horizontalAlignment='right'
                            buttonOptions={{
                                text:"Registrar",
                                icon:"save",
                                elementAttr:{style: "font-family: 'Lato', sans-serif !important; font-size: 11px !important;background-color:#98989A; color:#161A1D; border-radius:7px; padding:5px;"},
                                useSubmitBehavior:true
                            }}> 
                            
                        </ButtonItem>
                    </Form>
                 </form>
                </>
                </Popup>
               
            {/*     <Toast visible={visible}
                       message={mensaje}
                       type={tipoMensaje}
                       displayTime={4000}
                       onHiding={hideToast}>
    
                </Toast> */}
        </>
        )
}