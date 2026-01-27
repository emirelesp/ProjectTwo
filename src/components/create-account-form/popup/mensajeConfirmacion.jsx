import Popup from "devextreme-react/popup";
import { useNavigate } from "react-router-dom";




const MensajeConfirmacion = (props) => {

  const navigate = useNavigate();

  const {isVisible,setisVisible}=props;



  return (
    <div>  
      <Popup
        visible={isVisible}
        onHiding={() => setisVisible(false)}
        title="Registro exitoso"
        width="100%"
        maxWidth={"400px"}
        height="auto"
        showCloseButton={true}
        dragEnabled={true}
      >
      <div className="text-center titularesVerde24">
        Para continuar, activa tu cuenta a través del correo electrónico que registraste.
      </div>

      <div className="p-3 titularesNegro" style={{textAlign: "justify"}}>
       
          Te recordamos que en caso de no encontrar el mensaje de correo electrónico correspondiente, revisa en tu bandeja de Spam o correos no deseados. 

      
      </div>
      <div  className="p-3 titularesNegro" style={{textAlign: "justify"}}>
        
           Además, te sugerimos agregar la cuenta cuentadedondesaleelcorreo@dominio.com a tu lista de contactos, para garantizar que nuestros mensajes de correo lleguen a tu bandeja de entrada principal.
        
      </div>

          <div className='col-10 mx-auto'>
                        <button className='btn' style={{ fontFamily:"'Lato', sans-serif", fontSize:"16px",backgroundColor:"#a57f2c", color:"white", borderRadius:"30px", padding:"10px",width:"100%"}}
                           onClick={()=>{
                              setisVisible(false);
                              navigate("/login");
                              
                           }}
                        >

                          continuar
                        </button>
          </div>

      </Popup>
    </div>
  );
};

export default MensajeConfirmacion;


