import Popup from "devextreme-react/popup";





const MensajeConfirmacion = (props) => {


  const {isVisible,setisVisible}=props;



  return (
    <div>  
      <Popup
        visible={isVisible}
        onHiding={() => setisVisible(false)}
        title="Confirmación"
        width="100%"
        maxWidth={"400px"}
        height="auto"
        showCloseButton={true}
        dragEnabled={true}
      >
      <div className="text-center titularesVerde24">
        Correo confirmado correctamente.
      </div>

          <div className='col-10 mx-auto'>
                        <button className='btn' style={{ fontFamily:"'Lato', sans-serif", fontSize:"16px",backgroundColor:"#a57f2c", color:"white", borderRadius:"30px", padding:"10px",width:"100%"}}
                           onClick={()=>{
                              setisVisible(false);
                              //navigate("/login");
                              
                           }}
                        >

                          CONTINUAR
                        </button>
          </div>

      </Popup>
    </div>
  );
};

export default MensajeConfirmacion;


