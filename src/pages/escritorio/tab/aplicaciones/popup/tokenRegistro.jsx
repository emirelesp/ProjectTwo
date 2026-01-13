

import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';

import React, { useCallback, useEffect, useState, useRef } from "react";
import Popup from "devextreme-react/popup";
import Examen from "../examen";
import { getPreguntasExamen } from "../service/aplicacionesApi";
import LoadIndicator from 'devextreme-react/load-indicator';
import { useSelector } from 'react-redux';


const TokenRegistro = (props) => {

  const[validar,setValidar]=useState(false);

  const {isVisible,setisVisible,informacionGridClic}=props;

  const formData = useRef({ Token: '' });


     const [preguntaActualTotales_,setPreguntaActualTotales_]=useState([]);
   //const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

 
  /*  const getPreguntasExamenCallback=useCallback(async ()=>{
     //setLoading(true);
     //const result= //
   
     //setPreguntaActualTotales(result);
    //setLoading(false);
   
    },[informacionGridClic?.idAspiranteExamen]);
 */



const onSubmit = useCallback(async (e) => {
    e.preventDefault();
  



    const data=  formData.current;
     const result=  await getPreguntasExamen(informacionGridClic?.idAspiranteExamen, data.Token); 
       const total=    result.length;
       if(total>0){
         setValidar(true);
         setPreguntaActualTotales_(result);
       }
      ////no hay

    if (result.isOk) {
      //navigate('/login');
    } else {
     // notify(result.message, 'error', 2000);
    }
  }, [informacionGridClic?.idAspiranteExamen]);


  

  return (
    <div>
    
      <Popup
        visible={isVisible}
        onHiding={() => setisVisible(false)}
        title="Registar"
        width="100%"
        height="auto"
        showCloseButton={true}
        dragEnabled={true}
      >
   
         {validar?(
            <Examen datosArea={informacionGridClic}   preguntaActualTotales={preguntaActualTotales_} setPreguntaActualTotales={setPreguntaActualTotales_}/>
           ):(

              <form className={'create-account-form'} onSubmit={onSubmit}>
                  <Form formData={formData.current}  colCount={12}  >{/*disabled={loading} */}

                              <Item
                                        dataField={'Token'}
                                        editorType={'dxTextBox'}
                                        //  editorOptions={CURPEditorOptions}
                                        colSpan={12}
                              >
                                    <RequiredRule message="Requiere Token" />
                                    <Label visible={false} />
                              </Item>


                              <ButtonItem  colSpan={12}>
                      <ButtonOptions
                        width={'100%'}
                        type={'default'}
                        useSubmitBehavior={true}
                      >
                        <span className="dx-button-text">
                          {
                            false
                              ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                              : 'Registrar ahora'
                          }
                        </span>
                      </ButtonOptions>
                    </ButtonItem>
                 </Form>
              </form>
           )
         }


      </Popup>
    </div>
  );
};

export default TokenRegistro;


