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
      <Form formData={formData.current} disabled={loading} colCount={12}  >

                 <Item
                            dataField={'CURP'}
                            editorType={'dxTextBox'}
                             editorOptions={CURPEditorOptions}
                            colSpan={6}
                  >
                     <RequiredRule message="Requiere CURP" />
                       <Label visible={false} />
                  </Item>




                  <Item
                   
                        dataField={'nombre'}
                        editorType={'dxTextBox'}
                        colSpan={6}
                        editorOptions={nombreEditorOptions}
                  >
                     <RequiredRule message="Requiere Nombre" />
                    <Label visible={false} />
                  </Item>






                  <Item
                      dataField={'apellidoPaterno'}
                        editorType={'dxTextBox'}
                        colSpan={6}
                          editorOptions={apellidoPatEditorOptions}
                  >
                        <RequiredRule message="Requiere Apellido Paterno" />
                       <Label visible={false} />
                  </Item>


    


       

                  <Item
                      dataField={'apellidoMaterno'}
                        editorType={'dxTextBox'}
                        colSpan={6}
                          editorOptions={apellidoMatEditorOptions}
                  >
                      <Label visible={false} />
                  </Item>


     


               



       

                  <Item
                      dataField={'telefono'}
                        editorType={'dxTextBox'}
                        colSpan={12}
                          editorOptions={telefonoEditorOptions}
                  >
                        <RequiredRule message="Requiere Telefono" />
                        <Label visible={false} />
                    </Item>

        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
           colSpan={12}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Requiere Email" />
          <EmailRule message="Email is invalid" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
           colSpan={12}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
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
                  : 'Registrar ahora'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
      <div className={'login-link'}>
        Tienes Cuenta? <Link to={'/login'}>Login</Link>
      </div>
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





