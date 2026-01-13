import React, { useCallback, useEffect, useState } from "react";
import {getPreguntasExamen, setRegistrarRespuesta} from '../service/aplicacionesApi.jsx'
import { LoadPanel } from "devextreme-react";
import "../css/Preguntas.css"



function Pregunta(props) {

  const [indice, setIndice] = useState(0);
  
  const {informacion,activo, setActivo,terminado, setTerminado,preguntaActualTotales,setPreguntaActualTotales}=props;
 //debugger;
 // const [preguntaActualTotales,setPreguntaActualTotales]=useState([]);
  const [preguntaActual,setPreguntaActual]=useState({idPregunta:-1,respuestas:[]});
  const [loading, setLoading] = useState(false);//top

 //const preguntaActual = informacion[indice];

 
/* 
  const getPreguntasExamenCallback=useCallback(async ()=>{
    setLoading(true);
    const result=await getPreguntasExamen(informacion?.idAspiranteExamen,'c210b2a8');  //
  
    setPreguntaActualTotales(result);
   setLoading(false);
  
   },[informacion?.idAspiranteExamen]); */

   const setRegistrarRespuestaCallback=useCallback(async ()=>{
  setLoading(true);
    const result=await setRegistrarRespuesta(preguntaActual.idDetalleAspiranteExamen,preguntaActual.idRespuesta);  
    
   setLoading(false);
  
   },[preguntaActual?.idPregunta,preguntaActual?.idRespuesta]);




  /*  useEffect(()=>{
     
    getPreguntasExamenCallback();

   },[]);

     useEffect(()=>{

     getPreguntasExamenCallback();

   },[informacion?.idAspiranteExamen]); */


  useEffect(()=>{


      const valor=preguntaActualTotales[indice];
       setPreguntaActual(valor);
  


   },[indice,preguntaActualTotales]);










  const siguientePregunta = () => {


      const seleccionado = document.querySelector('input[name="pregunta-'+preguntaActual.idPregunta+'"]:checked').value;
      setRegistrarRespuestaCallback();



    if (indice < preguntaActualTotales.length - 1) {

      setIndice(indice + 1);
     // setSeleccion(null); // reset selección
    } else {

      
      alert("¡Has terminado!");
        setActivo(false);
      setTerminado(true);
    

    }
  };


    const anteriorPregunta = () => {
    if (indice != 0) {
      setIndice(indice - 1);

     // setSeleccion(null); // reset selección
    } else {
      alert("¡Has regresado al inicio!");
    }
  };

  return (



<>

       <LoadPanel
                visible={loading}
              
                showPane={true}
                showIndicator={true}
                shading={true}
                shadingColor="rgba(0,0,0,0.4)"
                height={100}
                width={250}
                message="Cargando Documentos..."
                indicatorSrc="https://js.devexpress.com/Content/data/loadingIcons/rolling.svg"
            />
   

{ activo?(
   <article className="cardPregunta" role="group" aria-labelledby="q1-title">

    <div className="content_2">
     
     <div className="row">
      <div className="question col-12 col-sm-6 col-xl-6" id="q1-title">{preguntaActual?.pregunta}</div>
      <div className="col-12 col-sm-6 col-xl-6">
       <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
                alt="Pregunta"
                style={{  height: "200px", marginBottom: "5px" }}
     /> 
     </div>
   </div>

  
        <fieldset>
       
            
      

       

       {preguntaActual?.respuestas.map((opcion, i) => {



      return(
        <div key={i} className="option">
        
            <input
              type="radio"
              name={`pregunta-${preguntaActual.idPregunta}`}
              value={opcion.idRespuesta}
              checked={Number(opcion.idRespuesta)==preguntaActual.idRespuesta}
              onChange={() => {
                
                const seleccionado = document.querySelector('input[name="pregunta-'+preguntaActual.idPregunta+'"]:checked').value;
  
                     
               const dataActualizado = preguntaActualTotales.map(pregunta => ({ 
                   ...pregunta, 
                    idRespuesta: preguntaActual.idPregunta==pregunta.idPregunta?Number(seleccionado):pregunta.idRespuesta
                 }));

               
                  setPreguntaActualTotales([...dataActualizado]);
                 
              }}
              //checked={opcion.idRespuesta ==preguntaActual.idRespuesta }
            />
            
            <label for="opt-a">{opcion.respuesta}</label>
        </div>

       
      );
      
   })} 


        </fieldset>

        <div className="actions">
        
        

           <button className="col-6 btn btn-secondary"
        onClick={anteriorPregunta}
        disabled={preguntaActual?.idRespuesta === 0}
        style={{ marginTop: "20px" }}
      >
        Atrás
      </button>


      <button className="col-6 btn btn-primary"
        onClick={siguientePregunta}
        disabled={preguntaActual?.idRespuesta === 0}
        style={{ marginTop: "20px" }}
      >
        
        
        {indice == preguntaActualTotales.length - 1?
            (<>Finalizar</>): (<>Siguiente</>)
        }
      </button>
        </div>

        <p id="feedback" className="feedback" role="status" aria-live="polite"></p>
    
    </div>
  </article>
):(

   <>
 
   </>

)
  }

 </>
  );
}

export default Pregunta;