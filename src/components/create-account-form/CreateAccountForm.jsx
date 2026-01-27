import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import LoadIndicator from 'devextreme-react/load-indicator';
import { createAccount } from '../../api/auth';

import './CreateAccountForm.scss';
import MensajeConfirmacion from './popup/mensajeConfirmacion';

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isVisible_,setisVisible_]=useState(false);

  const formData = useRef({ email: '', password: '' });

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
  

    setLoading(true);

    const result = await createAccount( formData.current);
    setLoading(false);

    if (result.isOk) {
      
      //navigate('/login');
    setisVisible_(true);
    
    } else {
      notify(result.message, 'error', 2000);
    }
  }, [navigate]);

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );

  const curpPattern = /^([A-Z][AEIOU][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
  const phonePattern = /^\d{10}$/; 
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (

    <>
     <MensajeConfirmacion isVisible={isVisible_} setisVisible={setisVisible_}></MensajeConfirmacion>
    
    <form className={'create-account-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading} colCount={12} labelLocation='left' showRequiredMark={false} >

                 <Item
                            dataField={'CURP'}
                            editorType={'dxTextBox'}
                             editorOptions={CURPEditorOptions}
                            colSpan={12}
                            validationRules={[
                                {
                                  type: "required",
                                  message: "El CURP es obligatorio"
                                },
                                {
                                  type: "pattern",
                                  pattern: curpPattern,
                                  message: "Ingrese un CURP válido"
                                }
                             ]}
                                        >
                     {/* <RequiredRule message="Requiere CURP" /> */}
                       <Label visible={true} text='CURP'  component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >CURP:</span>

                 )}  />
                  </Item>




                  <Item
                   
                        dataField={'nombre'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                        editorOptions={nombreEditorOptions}
                        validationRules={[ 
                          { type: "required", message: "El nombre es obligatorio" },
                          { type: "pattern", pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s'-]+$/,
                            message: "Ingrese solo letras, números y espacios" 
                           }]}
                         >
                    
                    <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Nombre:</span>

                 )}  />
                  </Item>






                  <Item
                      dataField={'apellidoPaterno'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                          editorOptions={apellidoPatEditorOptions}

                            validationRules={[ 
                              { type: "required", message: "El Apellido Paterno es obligatorio" },
                              { type: "pattern", pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s'-]+$/,
                                message: "Ingrese solo letras, números y espacios" 
                              }]}
                         >
                  
               
                       <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Apellido Paterno:</span>

                 )}  />
                  </Item>


    


       

                  <Item
                      dataField={'apellidoMaterno'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                        editorOptions={apellidoMatEditorOptions}
                           validationRules={[ 
                              { type: "required", message: "El Apellido Paterno es obligatorio" },
                              { type: "pattern", pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s'-]+$/,
                                message: "Ingrese solo letras, números y espacios" 
                              }]
                            }

                  >
                      <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Apellido Materno:</span>

                 )} />
                  </Item>       

                  <Item
                      dataField={'telefono'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                        editorOptions={telefonoEditorOptions}

                        validationRules={[
                                            { type: "required", message: "El teléfono es obligatorio" },
                                            { type: "pattern", pattern: phonePattern, message: "Ingrese un teléfono válido" }
                                        ]}
                  >
                        
                        <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Telefono:</span>

                 )} />
                    </Item>

        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          colSpan={12}
          editorOptions={emailEditorOptions}
            validationRules={[
          { type: "required", message: "El correo es obligatorio" },
          { type: "pattern", pattern: emailPattern, message: "Ingrese un correo válido" }
        ]}
        >
          



          <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Correo:</span>

                 )}  />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
           colSpan={12}
          editorOptions={passwordEditorOptions}
          validationRules={[ 
            { type: "required", message: "La contraseña es obligatoria" }, 
            {
               type: "pattern", pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d<>]).{8,}$/,
               message: "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (excepto < >)" 
            } ]}
        >
         
          <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Contraseña:</span>

                 )} />
        </Item>
        <Item
          dataField={'confirmedPassword'}
          editorType={'dxTextBox'}
           colSpan={12}
          editorOptions={confirmedPasswordEditorOptions}
        >
          <RequiredRule message="Requiere contraseña." />
          <CustomRule
            message={'La contraseña es diferente.'}
            validationCallback={confirmPassword}
          />
          <Label visible={true}  component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Confirmar Contraseña:</span>

                 )}  />
        </Item>
  
        <ButtonItem  colSpan={12}>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
              elementAttr={{
                        style: "font-family: 'Lato', sans-serif !important; font-size: 18px !important;background-color:#a57f2c; color:white; border-radius:12px; padding:10px;width:100%"
                      }}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'REGISTRAR'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
    {/*   <div className={'login-link'}>
        Tienes Cuenta? <Link to={'/login'}>Login</Link>
      </div> */}
    </form>

    </>
  );
}


const CURPEditorOptions = { stylingMode: 'filled', placeholder: 'CURP', mode: 'CURP' };

const nombreEditorOptions = { stylingMode: 'filled', placeholder: 'Nombre', mode: 'nombre' };
const apellidoPatEditorOptions = { stylingMode: 'filled', placeholder: 'Apellido Paterno', mode: 'apellidoPaterno' };
const apellidoMatEditorOptions = { stylingMode: 'filled', placeholder: 'Apellido Materno', mode: 'apellidoMaterno' };

const telefonoEditorOptions = { stylingMode: 'filled', placeholder: 'Telefono', mode: 'telefono' };


const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Password', mode: 'password' };
const confirmedPasswordEditorOptions = { stylingMode: 'filled', placeholder: 'Confirmar Password', mode: 'password' };





