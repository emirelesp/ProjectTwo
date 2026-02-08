import React, { useCallback, useEffect, useState, useRef } from 'react';
import Popup from 'devextreme-react/popup'
import { getAspirantes, setAgendaExamen } from './aspirantes';
import { getFechasAplicacion,filtroFechaAplicacion } from './fechaAplicacion';
import Form, {ButtonItem, ButtonOptions, Item} from 'devextreme-react/form';
import Toast from 'devextreme-react/toast';

export function PopupAsignar(props) 
{
    const {visiblePopupAsignarSede, setVisiblePopupAsignarSede, dataSedes, idAspirante,  setRefresh} = props
    
    const [dataEtapas, setDataEtapas] = useState({ });
    const [dataFechas, setDataFechas] = useState({ });
    const [asignacion, setAsignacion] = useState({sede: null, oportunidad: null, fechaAplicacion: null, fecha: null });
    const [sede, setSede] = useState('');
    const [visible, setVisible] = useState();
    const [mensaje, setMensaje] = useState();
    const [tipoMensaje, setTipoMensaje] = useState();
    const [formKey, setFormKey] = useState(0);

    const cerrarPopupAsigarSede = () => {
        setAsignacion({sede:null, oportunidad:null, fechaAplicacion:null, fecha:null});
        setSede("");
        setFormKey(prev => prev + 1);
        setVisiblePopupAsignarSede(false);
    }

    const cambioSede = async(e) =>{
        setAsignacion(prev => ({ ...prev, sede:e.value}));
        const valor = dataSedes.find(s => s.value === e.value);
        setSede(valor);

        if(e.value != null || e.value != undefined)
        {
            const dataEtapas = await getFechasAplicacion(e.value);
            setDataEtapas(dataEtapas);
        }
    };

    const cambioOportunidad = (e) => {
        setAsignacion(prev => ({ ...prev, oportunidad:e.value}));
    };

    const cambioConvocatoria = async(e) => {
        setAsignacion(prev => ({ ...prev, fechaAplicacion:e.value}));

        if(e.value != null || e.value != undefined)
        {
            const dataFechas = await filtroFechaAplicacion(e.value);
            setDataFechas(dataFechas);
        }
    };

    const cambioEtapa = (e) =>{
        setAsignacion(prev => ({ ...prev, fecha:e.value}));
    }

    const asignarAgendaExamen = (async(e) => {
        e.preventDefault();

        const agendaExamen = {idAspirante: idAspirante, 
                            idEtapaAplicacion: asignacion.fechaAplicacion,
                            idOportunidad: asignacion.oportunidad,
                            fecha: asignacion.fecha
                }
        const res = await setAgendaExamen(agendaExamen);
        
        if(res[0].value > 0)
        {
           // setDataAspirantes(dataAspirantes.map(a => a.idAspirante === idAspirante ? {...a, sede:sede.text} : a));
            
            setRefresh(Date.now());
            
            
            cerrarPopupAsigarSede();
            setMensaje(res[0].text);
            setTipoMensaje("success");
            setVisible(true);

        }
        else{
            cerrarPopupAsigarSede();
            setMensaje(res[0].text);
            setTipoMensaje("warning");
            setVisible(true);
        }
    })

    const hideToast = () => {
        setVisible(false);
    }

    const dataOportunidades = [
        {value:1, text:"Oportunidad 1"},
        //{value:2, text:"Oportunidad 2"},
        //{value:3, text:"Oportunidad 3"}
    ]

return(
    <>
    <Popup id="asignarSede"
                visible={visiblePopupAsignarSede}
                onHiding={cerrarPopupAsigarSede}
                showTitle={true}    
                title={"Asignar sede y fecha de aplicación"}
                width="50%"
                height="auto"
                dragEnabled={true}
                position={"center"}
                >
                <br/>
                
                <form onSubmit={asignarAgendaExamen}>
                <Form key={formKey} formData={asignacion} validationGroup='frmAsign' labelLocation='left'>
                    <Item dataField="sede"editorType='dxSelectBox' 
                        editorOptions={{items:dataSedes, valueExpr:"value", displayExpr:"text", 
                                        searchEnabled:true, onValueChanged:cambioSede, showClearButton:true}}
                        validationRules={[
                            {type:'required', message:'La sede es obligatoria'}]}>

                    </Item>
                    <Item dataField="oportunidad" editorType='dxSelectBox' 
                        editorOptions={{items:dataOportunidades, valueExpr:"value", displayExpr:"text", 
                                        searchEnabled:true, onValueChanged:cambioOportunidad, showClearButton:true}}
                        validationRules={[
                            {type:'required', message:'La oportunidad es obligatoria'}]}>
                    </Item>
                    <Item dataField="fechaAplicacion" editorType='dxSelectBox'  
                        editorOptions={{items:dataEtapas, valueExpr:"value", displayExpr:"text", 
                                        searchEnabled:true, onValueChanged:cambioConvocatoria, showClearButton:true}}
                        validationRules={[
                            {type:'required', message:'El periodo de aplicación es obligatorio'}]}>
                    </Item>
                    <Item dataField="fecha" editorType='dxSelectBox' 
                        editorOptions={{items:dataFechas, valueExpr:"value", displayExpr:"text", 
                                        searchEnabled:true, onValueChanged:cambioEtapa, showClearButton:true}}
                        validationRules={[
                            {type:'required', message:'La fecha de aplicación es obligatoria'}]}>
                    </Item>

                    <ButtonItem horizontalAlignment='right'
                                buttonOptions={{
                                    text:"Registrar",
                                    type:"success",
                                    useSubmitBehavior:true
                                }}> 
                        
                    </ButtonItem>
                </Form>
                </form>

            </Popup>

            <Toast visible={visible}
                   message={mensaje}
                   type={tipoMensaje}
                   displayTime={4000}
                   onHiding={hideToast}>

            </Toast>

            </>
    )
}