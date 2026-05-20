import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import Button from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import { useAuth } from "../../contexts/auth-hooks";

import "./LoginForm.scss";
import MensajeConfirmacion from "./popup/mensajeConfirmacion";
import ReCAPTCHA from "react-google-recaptcha";
import { ValidationGroup } from "devextreme-react/validation-group";
import validationEngine from "devextreme/ui/validation_engine";

export default function LoginForm() {
  // const navigate = useNavigate();
  const { signIn } = useAuth();

  const [captchaValido, setCaptchaValido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(false);

  const formData = useRef({ email: "", password: "" });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      //debugger;
      // Ejecuta todas las validaciones del grupo
      //const validate = validationEngine.validateGroup(e.target);

      //if (!validate.isValid) {
      // return; // DevExtreme ya mostró los errores
      //}

      if (!captchaValido) {
        notify(
          "Selecciona el CAPTCHA para verificar identidad.",
          "warning",
          5000,
        );
        return;
      }

      const { email, password } = formData.current;
      setLoading(true);

      const result = await signIn(email, password);

      setLoading(false);

      if (!result.data.isOk) {
        if (result.data.id == 0) notify(result.data.message, "error", 5000);
        if (result.data.id == -1) notify(result.data.message, "error", 5000);
        if (result.data.id == -2) setMensaje(true);
        if (result.data.id == -3) notify(result.data.message, "error", 5000);
      } else {
        window.location.reload();
      }
    },
    [signIn, captchaValido],
  );

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
    <>
      <MensajeConfirmacion
        isVisible={mensaje}
        setisVisible={setMensaje}
      ></MensajeConfirmacion>

      <div className="row">
        <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 mx-auto">
          <hr style={{ color: "white", height: "5px" }} />
          <form className={"login-form"} onSubmit={onSubmit}>
            <Form
              formData={formData.current}
              disabled={loading}
              showRequiredMark={false}
            >
              <Item
                dataField={"email"}
                editorType={"dxTextBox"}
                editorOptions={emailEditorOptions}
              >
                <RequiredRule message="Requiere un Email" />
                <EmailRule message="Requiere un Email" />
                <Label
                  //text={"Usuario"}
                  visible={true}
                  component={() => (
                    <span id="LoginUsuario" className="letrasblanco">
                      Usuario:
                    </span>
                  )}
                />
              </Item>

              <Item
                dataField={"password"}
                editorType={"dxTextBox"}
                editorOptions={passwordEditorOptions}
              >
                <RequiredRule message="Requiere una contraseña" />
                <Label
                  visible={true}
                  component={() => (
                    <span id="LoginContrasena" className="letrasblanco">
                      Contraseña:
                    </span>
                  )}
                />
              </Item>

              {/*       <Item
                  component={()=>(
                     <ReCAPTCHA
                        sitekey="6LeRIO8sAAAAAHYMGcPH6g4P-LHbB_Vu-DAbB2ag"//clave del sitio
                        onChange={(value)=>{ 
                          debugger;
                          setCaptchaValido(true)
                        
                        }}
                      />
                                

                 )}
              /> */}

              <Item itemType="simpleItem">
                <Link
                  to={"/reset-password"}
                  style={{
                    color: "#002f2a",
                    textDecoration: "underline",
                    fontFamily: "Lato",
                  }}
                >
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

              <Item>
                <>
                  <div className="p-1"></div>
                  <center>
                    <ReCAPTCHA
                      sitekey="6LeRIO8sAAAAAHYMGcPH6g4P-LHbB_Vu-DAbB2ag" //clave del sitio
                      onChange={(value) => {
                        setCaptchaValido(value);
                      }}
                    />
                  </center>

                  <div className="p-2"></div>
                </>
              </Item>

              <ButtonItem>
                <ButtonOptions
                  width={"90%"}
                  //type={'default'}
                  useSubmitBehavior={true}
                  elementAttr={{
                    style:
                      "font-family: 'Lato', sans-serif !important; font-size: 16px !important;background-color:#1e5b4f; color:white; border-radius:12px; padding:10px;width:100%",
                  }}
                >
                  <span className="dx-button-text">
                    {loading ? (
                      <LoadIndicator
                        width={"24px"}
                        height={"24px"}
                        visible={true}
                      />
                    ) : (
                      "INGRESAR"
                    )}
                  </span>
                </ButtonOptions>
              </ButtonItem>
            </Form>
          </form>
        </div>
      </div>
    </>
  );
}

const emailEditorOptions = {
  maxLength: 100,
  stylingMode: "filled",
  placeholder: "Email",
  mode: "email",
  elementAttr: { class: "redondeadotext" },
};
const passwordEditorOptions = {
  maxLength: 20,
  stylingMode: "filled",
  placeholder: "Password",
  mode: "password",
  elementAttr: { class: "redondeadotext" },
  showPasswordButton: true,
};
const rememberMeEditorOptions = {
  text: "Remember me",
  elementAttr: { class: "form-text" },
};
