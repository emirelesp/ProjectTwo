
import React, { useState, useRef } from "react";
import TextArea from "devextreme-react/text-area";
import "katex/dist/katex.min.css";
import katex from "katex";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';

export function PreguntasItem(props){

 
/************************************************************************************************+ */
   const formData = useRef({preguntas:""});
  
  const onSubmit = async (e) => {
    e.preventDefault();
   
    const data=formData.current; 
    debugger;
  
  };



  return (
    <>
  <form  onSubmit={onSubmit}>
      <Form formData={ formData.current }  >
        <Item
          dataField="preguntas"
          label={{text:"Preguntas"}}
          render={() => {

                const [value, setValue] = useState("");
                const [rendered, setRendered] = useState("");
                const Editor = useRef(null);



                    const GuardarPosicion = useRef({posicionInicial:0,posicionFinal:0});

                    const CursorTecla=()=>{
                            const textarea = Editor.current;
                            if (!textarea) return;
                            const posicionInicial_ = textarea.selectionStart;
                            const posicionFinal_ = textarea.selectionEnd; 
                            GuardarPosicion.current={posicionInicial :posicionInicial_,posicionFinal:posicionFinal_}
                    }

                    const CursorClic = () => { 

                        const textarea = Editor.current;
                        if (!textarea) return; 
                        const posicionInicial_ = textarea.selectionStart; 
                        const posicionFinal_ = textarea.selectionEnd; 
                        GuardarPosicion.current={posicionInicial:posicionInicial_,posicionFinal:posicionFinal_}
                  };


                  const renderMath = (texto) => { 
                      const conSaltos = texto.replace(/\n/g, "<br/>"); 
                      const cadena=  conSaltos.split('§');

                      let renderizadaTotal="";

                      for(let i=0;i<cadena?.length;i++){
                            const caracterFormula=cadena[i].substring(0,1);
                            const isFormula=caracterFormula=="\\";
                            renderizadaTotal+= isFormula?
                          katex.renderToString(cadena[i], { throwOnError: false }):cadena[i];

                      }

                      return renderizadaTotal;
                  };


                    const  insertarCodigoMath= (text) => {
                  
                      const textArea=  Editor.current;
                      const Posicion = GuardarPosicion.current; // referencia al <input> real
                      if (!Posicion) return;
                      if (!textArea) return;
                      
                      const nuevaCadena =
                        value.substring(0, Posicion.posicionInicial) +"§"+ text+"§" + value.substring(Posicion.posicionFinal,value.length);

                        textArea.selectionStart=textArea.selectionEnd=Posicion.posicionInicial + text.length; 
                         formData.current.preguntas= renderMath(nuevaCadena);
                         setValue(nuevaCadena);
                      
                        
                    };



                    const  insertarCodigoMathParentesis= () => {
                  
                      const textArea=  Editor.current;
                      const Posicion = GuardarPosicion.current; // referencia al <input> real
                      if (!Posicion) return;
                      if (!textArea) return;

                      const getTextoseleccionado=value.substring(Posicion.posicionInicial,Posicion.posicionFinal).replace(/§/g,'');
                      const addParentesis="\\left("+getTextoseleccionado+"\\right)";
                      const nuevaCadena =
                      value.substring(0, Posicion.posicionInicial) +"§"+ addParentesis+"§" + value.substring(Posicion.posicionFinal,value.length);
                      textArea.selectionStart=textArea.selectionEnd=Posicion.posicionInicial + addParentesis.length; 
                      formData.current.preguntas= renderMath(nuevaCadena);
                      setValue(nuevaCadena);
                      
                        
                    };

             return(

                <>
                  <div style={{ marginTop: "10px" }}>
                    <button type="button" onClick={() => insertarCodigoMath("\\frac{}{}")}>Fracción</button>
                    <button type="button" onClick={() => insertarCodigoMath("\\sqrt{}")}>Raíz</button>
                    <button type="button" onClick={() => insertarCodigoMath("\\int")}>Integral</button>
                    <button type="button" onClick={() => insertarCodigoMath("\\sum")}>Sumatoria</button>
                    <button type="button" onClick={() => insertarCodigoMathParentesis()}>paréntesis</button>
                  </div>

                  <textarea
                    value={value}
                    className="form-control"

                    onChange={(e) =>{ 
                         
                        CursorTecla();
                        formData.current.preguntas= renderMath(e.currentTarget.value);
                        setValue(e.currentTarget.value);

                       
                    }
                    }
                  
                    onClick={CursorClic}
                  // showClearButton={true}
                    ref={Editor}
                    spellCheck={false}     
                    autoCorrect="off"     
                    autoCapitalize="none"
                    
                    style={{width:"100%",height:"250px"}}

                  />

                

              
              
                    <div
                      style={{ whiteSpace: "pre-wrap", 
                              // respeta espacios y saltos de línea 
                              border: "1px solid #ccc", 
                              padding: "10px" }}
                              dangerouslySetInnerHTML={{ __html: renderMath(value) }} 
                    />
              

                </>

             );
          }
         }
        >
        </Item>


        <ButtonItem  colSpan={12}>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
             Guardar
          </ButtonOptions>
        </ButtonItem>

      </Form>
    </form>
     
  </>
  );



}

     









