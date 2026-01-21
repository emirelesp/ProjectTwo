const apiExamen=import.meta.env. VITE_WebApi_URL;


export async function getDocumentosAspirante(_idAspirante)
{
  let datos = [];

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteDocumento/ConsultaDocumentosAspirante';
    const unicoV = { id:_idAspirante, idStr:'' };
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
      });
      
      datos = await respuesta.json();

    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
  }
    return datos;
}

export async function getPagosAspirante(_idAspirante)
{
  let datos = [];

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteDocumento/ConsultaPagosAspirante';
    const unicoV = { id:_idAspirante, idStr:'' };
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
      });
      
      datos = await respuesta.json();

    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
  }
    return datos;
}

export async function setValidarDocumento(_idAspiranteDocumento, idRol)
{
  let respuesta = 0;
  let datos = [];

  const url = apiExamen+'/api/AspiranteDocumento/ValidaDocumento';
  const unicoV = { id:_idAspiranteDocumento, idStr:idRol };
    
    try{
        respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
        });
      
      datos = await respuesta.json();

    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
    
    return datos;
}

export async function setRechazarDocumento(_idAspiranteDocumento, idRol)
{
  let respuesta = 0;
  let datos = [];

  const url = apiExamen+'/api/AspiranteDocumento/RechazaDocumento';
  const unicoV = { id:_idAspiranteDocumento, idStr:idRol };
    
    try{
        respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
        });
      
      datos = await respuesta.json();

    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
    
    return datos;
}