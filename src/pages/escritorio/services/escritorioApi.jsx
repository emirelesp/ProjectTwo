
export async function getSeguimientoAspirante(_idAspirante)
{
  let datos = 0;

  if(_idAspirante != undefined)
  {
    const url = 'https://localhost:7029/api/Aspirante/ConsultaSeguimientoAspirante';
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