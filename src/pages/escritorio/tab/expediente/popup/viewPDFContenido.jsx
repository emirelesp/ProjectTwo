import React, { useEffect, useState } from "react";

 const  ViewPDFContent=()=>{

   return(
    <iframe src="data:application/pdf;base64,JVBERi0xLjQKJc..." 
     width="100%"
     height="100%"
     type="application/pdf">
    </iframe>
   );

}

export default ViewPDFContent;