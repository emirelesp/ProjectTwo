const apiExamen=import.meta.env.VITE_WebApi_URL;

export async function getFechasAplicacion(_idSede)
{
  let datos = [];

  if(_idSede != undefined)
  {
    const url = apiExamen+'/api/Convocatoria/ConsultaFechasAplicacion';
    const unicoV = { id:_idSede, idStr:'' };
    
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

export async function filtroFechaAplicacion(_idEtapaAplicacion)
{
  let datos = [];
  if(_idEtapaAplicacion != undefined)
  {
    const url = apiExamen+'/api/Convocatoria/FiltroFechaAplicacion';
    const unicoV = { id:_idEtapaAplicacion, idStr:'' };
    
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