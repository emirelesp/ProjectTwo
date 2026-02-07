const apiURL_Subdominio=import.meta.env.VITE_WebApi_URL;




export async function consultaDatosGeneralPanel(idAspiranteParam) {
  try {


   const parametros={

     id:idAspiranteParam,
     idStr:""

   };
   
   const respuesta = await fetch(apiURL_Subdominio+'/api/Aspirante/consultaDatosGeneralPanel', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",

              // TODO: Agregamso el espacio para el token aunque a�n no lo usamos/necesitamos/solican en la API
             // Authorization: `Bearer ${token}`
               
          },
          body: JSON.stringify(parametros),
          credentials: "include"
      });



    if (!respuesta.ok) throw new Error("Error servicio Api");

   
    const   data=await respuesta.json();
    
    
    return {
      isOk: true,////aqui va la conexion con la cookie esta en falso para poder trabajar con no auth
      data: data
    };
  }
  catch {
    return {
      isOk: false,
      data: {}
    };
  }
}



export async function getPanelInformacion(idAspiranteParam) {
  try {


   const parametros={

     id:idAspiranteParam,
     idStr:""

   };
   
   const respuesta = await fetch(apiURL_Subdominio+'/api/Aspirante/ConsultaEstatusExamenPanel', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",

              // TODO: Agregamso el espacio para el token aunque a�n no lo usamos/necesitamos/solican en la API
             // Authorization: `Bearer ${token}`
               
          },
          body: JSON.stringify(parametros),
          credentials: "include"
      });



    if (!respuesta.ok) throw new Error("Error servicio Api");

   
    const   data=await respuesta.json();
    
    
    return {
      isOk: true,////aqui va la conexion con la cookie esta en falso para poder trabajar con no auth
      data: data
    };
  }
  catch {
    return {
      isOk: false,
      data: {}
    };
  }
}




export async function getDocumentosValidados(idAspiranteParam) {
  try {


   const parametros={

     id:idAspiranteParam,
     idStr:""

   };
   
   const respuesta = await fetch(apiURL_Subdominio+'/api/AspiranteDocumento/ConsultaEstatusDocumentosPanel', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",

              // TODO: Agregamso el espacio para el token aunque a�n no lo usamos/necesitamos/solican en la API
             // Authorization: `Bearer ${token}`
               
          },
          body: JSON.stringify(parametros),
          credentials: "include"
      });



    if (!respuesta.ok) throw new Error("Error servicio Api");

   
    const   data=await respuesta.json();
    
    
    return {
      isOk: true,////aqui va la conexion con la cookie esta en falso para poder trabajar con no auth
      data: data
    };
  }
  catch {
    return {
      isOk: false,
      data: {}
    };
  }
}