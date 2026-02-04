import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
  CustomRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import { resetPassword } from '../../api/auth';
import './ResetPasswordForm.scss';
import { setResetPass, setRestablecerContrasena } from './service/PassApi';


export default function ResetPasswordForm() {
  

  const [parametros,setParametro]=useSearchParams();


  
  const token_= parametros.get("token");
  const email_= parametros.get("email");


  
  
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '' });

  const onSubmitReset = useCallback(async (e) => {


    e.preventDefault();
    const { email,password } = formData.current;
    setLoading(true);

    const result = await setResetPass(email_,token_,password);
       debugger;
    setLoading(false);

    if (result.isOk) {
     /// navigate('/login');
      notify(result, 'success', 2500);
    } else {
      notify(result, 'error', 2000);
    }
  }, [navigate]);






  
  const onSubmit = useCallback(async (e) => {


    e.preventDefault();
    const { email,password } = formData.current;
    setLoading(true);

    const result = await setRestablecerContrasena(email); 
       //debugger;
    setLoading(false);

    if (result.isOk) {
     /// navigate('/login');
      notify(result.message, 'success', 1000000);
    } else {
      notify(result.message, 'error', 1000000);
    }
  }, [navigate]);


/*********************************************************************** */

    const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );



  return (
  email_==null&&token_==null?(

    <form className={'reset-password-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
          
       
       validationRules={[
          { type: "required", message: "El correo es obligatorio" },
          { type: "pattern", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Ingrese un correo válido" }
        ]}
        
        
        >
         
        </Item>
        <ButtonItem>
          <ButtonOptions
            elementAttr={{
                        style: "font-family: 'Lato', sans-serif !important; font-size: 18px !important;background-color:#a57f2c; color:white; border-radius:12px; padding:10px;width:100%"
                      }}
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'RECUPERAR'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>

    </form>
  ):(

     <form className={'reset-password-form'} onSubmit={onSubmitReset}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
          
       
       validationRules={[
          { type: "required", message: "El correo es obligatorio" },
          { type: "pattern", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Ingrese un correo válido" }
        ]}
        
        
        >

       {email_}
         
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
  



        <ButtonItem>
          <ButtonOptions
            elementAttr={{
                        style: "font-family: 'Lato', sans-serif !important; font-size: 18px !important;background-color:#a57f2c; color:white; border-radius:12px; padding:10px;width:100%"
                      }}
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
            
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Restablecer contraseña'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
    </form>

  )
    
  );
}

const emailEditorOptions = {maxLength: 100, stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
//const submitButtonAttributes = { class: 'submit-button' };
const passwordEditorOptions = {maxLength: 20 ,stylingMode: 'filled', placeholder: 'Password', mode: 'password' };
const confirmedPasswordEditorOptions = {maxLength: 20, stylingMode: 'filled', placeholder: 'Confirmar Password', mode: 'password' };


