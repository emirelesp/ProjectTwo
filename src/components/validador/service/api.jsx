const apiExamen=import.meta.env.VITE_WebApi_URL;

export async function getValidadorDictamen(_idAspirante,_idOportunidad,_fechaExamen)
{
  let datos = [];
  

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/ConsultaValidadorDictamen';
    const unicoV = { idAspirante:_idAspirante,
       idOportunidad:_idOportunidad,
       fechaExamen:_fechaExamen };
    
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
