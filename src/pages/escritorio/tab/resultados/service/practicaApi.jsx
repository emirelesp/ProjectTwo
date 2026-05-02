const apiExamen=import.meta.env.VITE_WebApi_URL;

const apiReporte=import.meta.env.VITE_WebApi_Reporte;
const urlBase=import.meta.env.VITE_LocalBase_URL;

export async function getResultados(_idAspirante)
{
  let datos = [];
  

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/ConsultaResultadosAreaDisciplinar';
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



export async function getCatalogoDictamenResultados(_idAspirante)
{
  let datos = [];
  

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/ConsultaFiltrosDictamen';
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



export async function getCatalogoConstanciaResultados(_idAspirante)
{
  let datos = [];
  

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/ConsultaCatalogoConstanciaResultado';
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




export async function getConstanciaResultados(idAspirante_, idOportunidad_, fechaExamen_,criterio_)
{
  let datos = [];
  

  if(idAspirante_ != undefined)
  {
    const url = apiReporte+'/apiR/Reporte/ConstanciaDictamenUnicoPdf'; // ConstanciaResultadosPdf';
    const unicoV = { idAspirante:idAspirante_, idOportunidad:idOportunidad_, fechaExamen:fechaExamen_ ,criterio:criterio_,urlBase:urlBase};
    
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



export async function getDictamenResultados(idAspirante_,idOportunidad_,fechaExamen_)
{
  let datos = [];
  

  if(idAspirante_ != undefined)
  {
    const url = apiReporte+'/apiR/Reporte/DictamenFinal';
    const unicoV = { idAspirante:idAspirante_, idOportunidad:idOportunidad_,fechaExamen:fechaExamen_,urlBase:urlBase};
    
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




