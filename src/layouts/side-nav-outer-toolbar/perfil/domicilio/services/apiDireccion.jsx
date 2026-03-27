const apiExamen=import.meta.env.VITE_WebApi_URL;

export async function getEstados()
{
  let datos = [];
  
    const url = apiExamen+'/api/AspiranteDireccion/ConsultaEstados';
        
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'}
      });
      
      datos = await respuesta.json();
      return datos;
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
    
}

export async function getMunicipios(_idEstado)
{
  let datos = [];
  
    const url = apiExamen+'/api/AspiranteDireccion/ConsultaMunicipios';
    const unicoV = { id:_idEstado, idStr:'' };

    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
      });
      
      datos = await respuesta.json();
      return datos;
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
    
}

export async function getDomicilio(_idAspirante)
{
  let datos = [];
  
    const url = apiExamen+'/api/AspiranteDireccion/ConsultaDireccion';
    const unicoV = { id:_idAspirante, idStr:'' };

    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
      });
      
      datos = await respuesta.json();
      return datos;
      
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
}

export async function regDomicilio(_domicilio)
{
  let datos = [];
  
    const url = apiExamen+'/api/AspiranteDireccion/RegistraDireccion';

    try{
        const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(_domicilio)
      });
      
      datos = await respuesta.json();
      return datos;
      
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
}