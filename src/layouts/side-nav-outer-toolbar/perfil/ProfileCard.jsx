import { Button } from 'devextreme-react/button';



export const ProfileCard = ({ isExpand,nombre, imagenUrl, onEditar }) => {
  return (

    <>
    <div className={"profile-card_out_"+isExpand}>
       <div style={{paddingTop:"20px"}}></div>
      <div className={"profile-image-wrap_out_"+isExpand}>
       {/* <img src={imagenUrl} alt={`Foto de ${nombre}`} className={"profile-image_out_"+isExpand}  /> */} 
        
        <div  className={"profile-image_out_"+isExpand} > 
          <svg style={{color:"#F6F6F6"}} xmlns="http://www.w3.org/2000/svg" width="95%" height="auto" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
        </div>
     
      </div>

      <div className={"profile-info_out_"+isExpand}>
      <h2 className={"profile-name_out_"+isExpand}>
        <div style={{color:"white"}}>
        {nombre}
        </div>
        
        </h2>

        <Button
          className={'profile-button-out_'+isExpand}
          text="Editar cuenta"
          type="normal"
          stylingMode="contained"
          icon="edit"
          onClick={onEditar}
           elementAttr={{
                        class: "white-icon-button",
                        style: "font-family: 'Lato', sans-serif !important; font-size: 16px !important;background-color:#1e5b4f; color:white; border-radius:12px; padding:0px;width:100%"
                      }}
        />
      </div>
    </div>
   </>
  );
};
