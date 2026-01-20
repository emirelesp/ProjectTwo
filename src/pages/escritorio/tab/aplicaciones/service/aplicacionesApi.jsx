export async function getConsultaAreasDisciplinares(_idAspirante)
{
  let datos = [];

  if(_idAspirante != undefined)
  {
    const url = 'https://localhost:7029/api/AspiranteExamen/ConsultaAreasDisciplinares';
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


export async function getPreguntasExamen(_idAspiranteExamen,token)
{
  let datos = [];


  //if(token == undefined )return;

  if(_idAspiranteExamen != undefined )
  {
    const url = 'https://localhost:7029/api/AspiranteExamen/ConsultaPreguntasExamen';
    const unicoV = { id:_idAspiranteExamen, idStr:token };
    
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



export async function getPreguntasExamenModulo(_idAspiranteExamenModulo,token)
{
  let datosModulo = [];

if(_idAspiranteExamenModulo == undefined )return [];


for (let i = 0; i < _idAspiranteExamenModulo.length; i++) { 


   let preguntas=[];


    const url = 'https://localhost:7029/api/AspiranteExamen/ConsultaPreguntasExamen';
    const unicoV = { id:_idAspiranteExamenModulo[i].idAspiranteExamen, idStr:token };
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
      });
      
      preguntas = await respuesta.json();

    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
      // debugger;
       if(preguntas.length!=0)datosModulo=[...datosModulo,...preguntas];
         //        
 
          

  }


 //await _idAspiranteExamenModulo.map(async (valor,index)=>{});

 
    return datosModulo;
}


export async function setRegistrarRespuesta(_idDetalleAspiranteExamen,_idRespuesta)
{
  let datos = [];

  if(_idDetalleAspiranteExamen != undefined)
  {

    const url = 'https://localhost:7029/api/AspiranteExamen/RegistraRespuesta';
    const unicoV = { id:_idDetalleAspiranteExamen, idRespuesta:_idRespuesta };
    
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