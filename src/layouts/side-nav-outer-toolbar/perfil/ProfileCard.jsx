import { Button } from 'devextreme-react/button';



export const ProfileCard = ({ isExpand,nombre, imagenUrl, onEditar }) => {
  return (

    <>
    <div className={"profile-card_out_"+isExpand}>
       <div style={{paddingTop:"20px"}}></div>
      <div className={"profile-image-wrap_out_"+isExpand}>
        <img src={imagenUrl} alt={`Foto de ${nombre}`} className={"profile-image_out_"+isExpand}  />
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
