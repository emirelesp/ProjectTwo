

import React, { useEffect, useState } from "react";
import Popup from "devextreme-react/popup";
import UpFileContenido from './UpFileContenido'

const Up = (props) => {



  const {isVisible,setisVisible}=props;
  



  return (
    <div>
    
      <Popup
        visible={isVisible}
        onHiding={() => setisVisible(false)}
        title="Registar"
        width={400}
        height={250}
        showCloseButton={true}
        dragEnabled={true}
      >
      <UpFileContenido></UpFileContenido>
      </Popup>
    </div>
  );
};

export default Up;


