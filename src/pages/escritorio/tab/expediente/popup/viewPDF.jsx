

import React, { useEffect, useState } from "react";
import Popup from "devextreme-react/popup";
import ViewPDFContent from "./viewPDFContenido";


const ViewPDF= (props) => {



  const {isVisiblePDF,setisVisiblePDF}=props;
  



  return (
    <div>
    
      <Popup
        visible={isVisiblePDF}
        onHiding={() => setisVisiblePDF(false)}
        title="Ver "
        width={400}
        height={250}
        showCloseButton={true}
        dragEnabled={true}
      >
       <ViewPDFContent></ViewPDFContent>
      </Popup>
    </div>
  );
};

export default ViewPDF;


