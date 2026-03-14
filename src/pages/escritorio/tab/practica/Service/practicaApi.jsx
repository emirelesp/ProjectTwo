const apiExamen=import.meta.env. VITE_WebApi_URL;

export async function getAreasDisciplinaresPrueba(_idAspirante)
{
  let datos = [];

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/ConsultaAreasDisciplinaresPrueba';
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



export async function getPreguntasExamenPrueba (_idAspiranteExamenPrueba)
{
  let preguntas = [];

  if(_idAspiranteExamenPrueba != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/ConsultaPreguntasExamenPrueba';
    const unicoV = { id:_idAspiranteExamenPrueba, idStr:'' };
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV)
      });
      
      preguntas = await respuesta.json();


     preguntas= preguntas.map((object,index)=>{

     
      let ultima=false;
       
      (preguntas.length==index+1)?ultima=true:ultima=false;


              return {...object,
                      ExamenModulo:"",
                      areaDisciplinar: "",
                      isPortada:0,
                      ultima:ultima


              };

        });

        preguntas=[{  idPregunta:-1,respuestas:[],
                      ExamenModulo:"",
                      areaDisciplinar: "",
                      isPortada:1

        },...preguntas]; 
    
     

       //if(preguntas[0].idDetalleAspiranteExamen!=-1)datosModulo=[...datosModulo,...preguntas];
   






    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
  }
    return preguntas;
}


export async function setRegistrarRespuestaPrueba (_idDetalleAspiranteExamenPrueba,_idRespuesta)
{
  let datos = [];

  if(_idDetalleAspiranteExamenPrueba != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/RegistraRespuestaPrueba';
    const unicoV = { id:_idDetalleAspiranteExamenPrueba, idRespuesta:_idRespuesta };
    
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

