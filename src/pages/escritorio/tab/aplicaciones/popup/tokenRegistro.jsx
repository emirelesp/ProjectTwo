

import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';

import notify from 'devextreme/ui/notify';

import React, { useCallback, useEffect, useState, useRef } from "react";
import Popup from "devextreme-react/popup";
import Examen from "../examen";
import { getPreguntasExamen, getPreguntasExamenModulo } from "../service/aplicacionesApi";
import LoadIndicator from 'devextreme-react/load-indicator';
import { useSelector } from 'react-redux';


const TokenRegistro = (props) => {

  const[validar,setValidar]=useState(false);

  const {isVisible,setisVisible,informacionGridClic}=props;

  const formData = useRef({ Token: '' });


  const [mensaje,setMensaje]=useState(""); 
   


      const [loading,setloading]=useState(false);
     
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
  

    setloading(true);
   

    const data=  formData.current;
     ///  const result=  await getPreguntasExamenModulo(informacionGridClic?.idAspiranteExamen, data.Token); 
     const result=  await getPreguntasExamenModulo(informacionGridClic, data.Token); 

       const total=  result.length;
      
       if(total>0){
         setValidar(true);
         setPreguntaActualTotales_(result);
       }else{
             
              setMensaje("Token Inválido.")
             

       }

        setloading(false);
      ////no hay

    if (result.isOk) {
      //navigate('/login');
    } else {
     // notify(result.message, 'error', 2000);
    }
  }, [informacionGridClic]);///informacionGridClic?.idAspiranteExamen


  

  return (
    <div>
    
      <Popup
        visible={isVisible}
        onHiding={() => {
          setisVisible(false);
          setMensaje("");
        }}
        title="Ingresar token"
        width="100%"
        maxWidth={"400px"}
        height="auto"
        showCloseButton={true}
        dragEnabled={true}
      >
   


        
             
         {validar?(
            <Examen datosArea={informacionGridClic}   preguntaActualTotales={preguntaActualTotales_} setPreguntaActualTotales={setPreguntaActualTotales_}/>
           ):(
 
            <>
              <div style={{color:"red"}}>{mensaje}</div>
              <form className={'create-account-form p-2'} onSubmit={onSubmit}>
                  <Form formData={formData.current}  colCount={12}  >{/*disabled={loading} */}

                              <Item
                                    
                                        dataField={'Token'}
                                        editorType={'dxTextBox'}
                                       editorOptions={{maxLength: 8}}
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
                            loading
                              ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                              : 'Iniciar'
                          }
                        </span>
                      </ButtonOptions>
                    </ButtonItem>
                 </Form>
              </form>
            </>
           )
         }


         


      </Popup>
    </div>
  );
};

export default TokenRegistro;


