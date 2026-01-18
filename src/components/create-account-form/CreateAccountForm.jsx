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

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '' });

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
  

    setLoading(true);

    const result = await createAccount( formData.current);
    setLoading(false);

    if (result.isOk) {
      navigate('/login');
    } else {
      notify(result.message, 'error', 2000);
    }
  }, [navigate]);

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );

  return (
    <form className={'create-account-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading} colCount={12} labelLocation='left' showRequiredMark={false} >

                 <Item
                            dataField={'CURP'}
                            editorType={'dxTextBox'}
                             editorOptions={CURPEditorOptions}
                            colSpan={12}
                  >
                     <RequiredRule message="Requiere CURP" />
                       <Label visible={true} text='CURP'  component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >CURP:</span>

                 )}  />
                  </Item>




                  <Item
                   
                        dataField={'nombre'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                        editorOptions={nombreEditorOptions}
                  >
                     <RequiredRule message="Requiere Nombre" />
                    <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Nombre:</span>

                 )}  />
                  </Item>






                  <Item
                      dataField={'apellidoPaterno'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                          editorOptions={apellidoPatEditorOptions}
                  >
                        <RequiredRule message="Requiere Apellido Paterno" />
                       <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Apellido Paterno:</span>

                 )}  />
                  </Item>


    


       

                  <Item
                      dataField={'apellidoMaterno'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                          editorOptions={apellidoMatEditorOptions}
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
                  >
                        <RequiredRule message="Requiere Telefono" />
                        <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Telefono:</span>

                 )} />
                    </Item>

        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
           colSpan={12}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Requiere Email" />
          <EmailRule message="Email is invalid" />
          <Label visible={true} component={()=>(

                      <span id="RegistroUsuario" className='letrasNegro' >Correo:</span>

                 )}  />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
           colSpan={12}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
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





