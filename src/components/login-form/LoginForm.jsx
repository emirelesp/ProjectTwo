import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import Button from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import { useAuth } from '../../contexts/auth-hooks';

import  './LoginForm.scss';

export default function LoginForm() {
 // const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '' });

  const onSubmit = useCallback(async (e) => {
  
    e.preventDefault();
    const { email, password } = formData.current;
    setLoading(true);

    const result = await signIn(email, password);
    if (!result.isOk) {
      setLoading(false);
      notify(result.message, 'error', 2000);
    }else{
      window.location.reload();
    }
  }, [signIn]);

 /*  const onCreateAccountClick = useCallback(() => {
    navigate('/create-account');
  }, [navigate]); */

/*
col
 col-sm-: Para pantallas pequeñas (small), ≥576px.
col-md-: Para pantallas medianas (medium), ≥768px.
col-lg-: Para pantallas grandes (large), ≥992px.
col-xl-: Para pantallas extra grandes (extra large), ≥1200px.
col-xxl
*/ 

  return (

    <div className='row'>
      
      <div className='col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 mx-auto'>
          <hr style={{color:"white" ,height:"5px" }}/>
          <form  className={'login-form'} onSubmit={onSubmit}>
            <Form formData={formData.current} disabled={loading} showRequiredMark={false}>
              <Item
                dataField={'email'}
                editorType={'dxTextBox'}
                editorOptions={emailEditorOptions}
               
              >
                <RequiredRule message="Requiere un Email"  />
                <EmailRule message="Requiere un Email" />
                 <Label 
                 //text={"Usuario"} 
                 visible={true}  
                 component={()=>(

                      <span id="LoginUsuario" className='letrasblanco' >Usuario:</span>

                 )} />
              </Item>
                 

          {/*     <Item itemType="simpleItem">
                  <Link to={'/reset-password'} style={{ color: '#002f2a', textDecoration: 'underline',fontFamily: "Lato" }}>
                     ¿Olvidastes tu usuario?
                  </Link>
              </Item>
               */}
              <Item
                dataField={'password'}
                editorType={'dxTextBox'}
                editorOptions={passwordEditorOptions}
            
              >
                <RequiredRule message="Requiere una contraseña" />
                <Label  visible={true}
                  
                 component={()=>(

                      <span id="LoginContrasena" className='letrasblanco' >Contraseña:</span>

                 )}
                />
              </Item>
              <Item itemType="simpleItem">
                  <Link to={'/reset-password'} style={{ color: '#002f2a', textDecoration: 'underline',fontFamily: "Lato" }}>
                     ¿Olvidaste tu contraseña?
                  </Link>
              </Item>

             {/*  <Item
                dataField={'rememberMe'}
                editorType={'dxCheckBox'}
                editorOptions={rememberMeEditorOptions}
              >
                <Label visible={false} />
              </Item> */}
              <ButtonItem>
                <ButtonOptions
                  width={'90%'}
                  //type={'default'}
                  useSubmitBehavior={true}
                    elementAttr={{
                        style: "font-family: 'Lato', sans-serif !important; font-size: 16px !important;background-color:#1e5b4f; color:white; border-radius:12px; padding:10px;width:100%"
                      }}
                >
                  <span className="dx-button-text">
                    {
                      loading
                        ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                        : 'INGRESAR'
                    }
                  </span>
                </ButtonOptions>
              </ButtonItem>
            </Form>
        
            {/* <Button
              text={'Create an account'}
              stylingMode={ 'outlined' }
              width={'100%'}
              onClick={onCreateAccountClick}
            /> */}
          </form>
    </div>
    </div>
  );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email',elementAttr: { class: 'redondeadotext' }  };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Password', mode: 'password',elementAttr: { class: 'redondeadotext' } };
const rememberMeEditorOptions = { text: 'Remember me', elementAttr: { class: 'form-text' } };
