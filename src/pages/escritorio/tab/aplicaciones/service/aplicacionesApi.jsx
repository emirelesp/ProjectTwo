const apiExamen=import.meta.env. VITE_WebApi_URL;


export async function getConsultaAreasDisciplinares(_idAspirante)
{
  let datos = [];

  if(_idAspirante != undefined)
  {
    const url = apiExamen+'/api/AspiranteExamen/ConsultaAreasDisciplinares';
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
    const url = apiExamen+'/api/AspiranteExamen/ConsultaPreguntasExamen';
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


    const url = apiExamen+'/api/AspiranteExamen/ConsultaPreguntasExamen';
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





    
       if(preguntas.length>0)

       /**
        * 
        {
              "idDetalleAspiranteExamen": 321,
              "idPregunta": 2,
              "pregunta": "Lee atentamente los siguientes acontecimientos históricos relacionados con el proceso de independencia y la formación del Estado mexicano.\n\nOrdena los hechos de acuerdo con la secuencia cronológica en que ocurrieron, desde el acontecimiento más antiguo hasta el más reciente, con el propósito de comprender la continuidad histórica y la consolidación del Estado mexicano.\n\nSelecciona la opción que presenta el orden correcto.\n\n- Consumación de la Independencia de México.\n- Inicio del movimiento de Independencia con el levantamiento armado.\n- Promulgación de la Constitución Federal de 1824.\n- Proclamación del Plan de Iguala.\n",
              "idRespuesta": 5,
              "respuestas": [
                  {
                      "idRespuesta": 5,
                      "respuesta": "A. 2, 4, 1, 3"
                  },
                  {
                      "idRespuesta": 6,
                      "respuesta": "B. 4, 2, 1, 3"
                  },
                  {
                      "idRespuesta": 7,
                      "respuesta": "C. 2, 1, 4, 3"
                  },
                  {
                      "idRespuesta": 8,
                      "respuesta": "D. 1, 2, 4, 3"
                  }
              ]
          }

          {
    "idAspiranteExamen": 33,
    "sede": "Celaya",
    "fechaExamen": "2026-03-09T00:00:00",
    "areaDisciplinar": "1. Ciencias Sociales",
    "icon": "pdffile",
    "title": "1. Ciencias Sociales",
    "idOportunidad": 1,
    "bloque": 1
}
        * 
        */

    

   preguntas= preguntas.map((object,index)=>{

  
        
      let ultima=false;
       
      (preguntas.length==index+1)?ultima=true:ultima=false;


              return {...object,
                      ExamenModulo:_idAspiranteExamenModulo[i],
                      areaDisciplinar: _idAspiranteExamenModulo[i].areaDisciplinar,
                      isPortada:0,
                      ultima:ultima


              };

        });

        preguntas=[{  idPregunta:-1,respuestas:[],
                      ExamenModulo:_idAspiranteExamenModulo[i],
                      areaDisciplinar: _idAspiranteExamenModulo[i].areaDisciplinar,
                      isPortada:1

        },...preguntas]; 
    
       

       if(preguntas[0].idDetalleAspiranteExamen!=-1)datosModulo=[...datosModulo,...preguntas];
            
 
          

  }


 //await _idAspiranteExamenModulo.map(async (valor,index)=>{});
     // debugger;
 
    return datosModulo;
}


export async function setRegistrarRespuesta(_idDetalleAspiranteExamen,_idRespuesta,_ultima)
{
  let datos = [];

  if(_idDetalleAspiranteExamen != undefined)
  {
    ///debugger;
    const url = apiExamen+'/api/AspiranteExamen/RegistraRespuesta';
    const unicoV = { id:_idDetalleAspiranteExamen, idRespuesta:_idRespuesta,ultima:_ultima };
    
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


export async function getFiltroSede(_idUsuario)
{
  let datos = [];

  if(_idUsuario!= undefined)
  {
    const url = apiExamen+'/api/Sede/ConsultaSedes';
    const unicoV = { id:0, idStr:_idUsuario };
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unicoV),
         credentials: 'include',
      });
      
      datos = await respuesta.json();

    }
    catch(error){
        console.error("Error al crear el post:", error);
    }
  }
    return datos;
}
