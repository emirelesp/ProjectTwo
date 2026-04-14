const apiExamen=import.meta.env.VITE_WebApi_URL;



export async function getAspirantes(_idConvocatoria)
{
  let datos = [];
  
  if(_idConvocatoria != undefined)
  {
    const url = apiExamen+'/api/Aspirante/ConsultaAspirantes';
    const unicoV = { id:_idConvocatoria, idStr:'' };
    
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

export async function getAspirantesAsignados(_idSede)
{
  let datos = [];
  ///debugger;
  if(_idSede != undefined)
  {
    const url = apiExamen+'/api/Aspirante/ConsultaAspirantesAsignados';
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

export async function regAspirante(_aspirante)
{
  
  let datos = 0;
  const url = apiExamen+'/RegistroUsuarioEscolares';
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(_aspirante)
      });
      
      datos = await respuesta.json();
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }

    return datos;
}

export async function editAspirante(_aspirante)
{
///  debugger;
  let datos = 0;
  const url = apiExamen+'/api/Aspirante/ActualizaAspirante';

    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(_aspirante)
      });
      
      datos = await respuesta.json();
      
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }

    return datos;
}

export async function getOportunidad(_idAspirante)
{
  let datos = 0;
  const url = apiExamen+'/api/Aspirante/ConsultaOportunidad';
  const unicoV = { id1:_idAspirante, id2:1 };

    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV),
        credentials: "include"
      });
      
      datos = await respuesta.json();
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }

    return datos;
}


export async function setAgendaExamen(_agenda)
{
  let datos = 0;
  const url = apiExamen+'/api/Aspirante/AsignarFechaAplicacion';
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(_agenda),
        credentials: "include"
      });
      
      datos = await respuesta.json();
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }

    return datos;
}

export async function setKeyUnico(_key)
{
  let datos = 0;
  const url = apiExamen+'/api/Aspirante/AsignarToken';
 /// debugger;  
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(_key)
      });
      
      datos = await respuesta.json();
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
    return datos;
}

export async function setKeyMultiple(_key)
{
  let datos = 0;
  const url = apiExamen+'/api/Aspirante/AsignarTokenMultiple';
  //debugger;  
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(_key)
      });
      
      datos = await respuesta.json();
    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
    return datos;
}