import React, { useCallback, useEffect, useState } from "react";
import {getPreguntasExamenPrueba, setRegistrarRespuestaPrueba} from '../Service/practicaApi.jsx'
import { LoadPanel } from "devextreme-react";
import "../css/Preguntas.css"



function ExamenPractica(props) {

  const [indice, setIndice] = useState(0);
  
  const {informacion,activo, setActivo,terminado, setTerminado,areaDisciplinar}=props;

  const [preguntaActualTotales,setPreguntaActualTotales]=useState([]);
  const [preguntaActual,setPreguntaActual]=useState({idPregunta:-1,respuestas:[]});
  const [loading, setLoading] = useState(false);//top





  const getPreguntasExamenPruebaCallback=useCallback(async ()=>{
  setLoading(true);
    const result=await getPreguntasExamenPrueba(informacion.idAspiranteExamenPrueba);  
    setPreguntaActualTotales(result);
   setLoading(false);
  
   },[]);

   const setRegistrarRespuestaPruebaCallback=useCallback(async ()=>{
  setLoading(true);
    const result=await setRegistrarRespuestaPrueba(preguntaActual.idDetalleAspiranteExamenPrueba,preguntaActual.idRespuesta);  
    
   setLoading(false);
  
   },[preguntaActual?.idPregunta,preguntaActual?.idRespuesta]);




   useEffect(()=>{
     
    getPreguntasExamenPruebaCallback();

   },[]);

  useEffect(()=>{


      const valor=preguntaActualTotales[indice];
       setPreguntaActual(valor);
  


   },[indice,preguntaActualTotales]);










  const siguientePregunta = () => {

     if(preguntaActual.isPortada==0){
      const seleccionado = document.querySelector('input[name="pregunta-'+preguntaActual.idPregunta+'"]:checked').value;
      setRegistrarRespuestaPruebaCallback();
     }



    if (indice < preguntaActualTotales.length - 1) {
     
      setIndice(indice + 1);

      document.getElementById("iniciodecadaexamen").scrollIntoView({ 
        behavior: "smooth", // desplazamiento suave 
        block: "center" // posición vertical (start, center, end, nearest)
       });

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


       document.getElementById("iniciodecadaexamen").scrollIntoView({ 
        behavior: "smooth", // desplazamiento suave 
        block: "center" // posición vertical (start, center, end, nearest)
       });

     // setSeleccion(null); // reset selección
    } else {
      alert("¡Has regresado al inicio!");
    }
  };






/********************************** */


    const renderMath = (texto) => { 
                      const conSaltos = texto.replace(/\n/g, "<br/>"); 
                      const cadena=  conSaltos.split('§');

                      let renderizadaTotal="";

                      for(let i=0;i<cadena?.length;i++){
                            const caracterFormula=cadena[i].substring(0,1);
                            const isFormula=caracterFormula=="\\";
                            renderizadaTotal+= isFormula?
                          katex.renderToString(cadena[i], { throwOnError: false }):cadena[i];

                      }

                      return renderizadaTotal;
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
   

{preguntaActual?.isPortada==0? (activo?  (
   <article className="cardPregunta" role="group" aria-labelledby="q1-title">
        <div  className="d-flex justify-content-center align-items-center"
              style={{background: "rgb(25, 135, 84)", height: "100%", margin: "5px", padding: "5px"}}>
            <div className="titularesLineaBlancaPerfil" style={{color:"#ffffff"}}> {preguntaActual?.areaDisciplinar} </div>
       </div>


    <div className="content_2 titularesLinea">
     
     <div className="row" style={{border: "1px solid #ccc"}}>
      <div className="col-12 col-sm-12 col-xl-9" id="q1-title" style={{'text-align': 'justify'}}>
      
      
      
      
        {/* {preguntaActual?.pregunta} */}
      
         <div
                      style={{ whiteSpace: "pre-wrap", 
                              // respeta espacios y saltos de línea 
                              //border: "1px solid #ccc", 
                              padding: "10px" }}
                              dangerouslySetInnerHTML={{ __html: renderMath(preguntaActual?.pregunta) }} 
        />
      
      
      </div>
      <div className="col-12 col-sm-12 col-xl-3 text-center">
     {/*   <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
                alt="Pregunta"
                style={{  height: "200px", marginBottom: "5px" }}
     />  */}

      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="200px"  fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>
      </svg>
     </div>
   </div>

  
        <fieldset className="p-2" >
       
            
      

       

       {preguntaActual?.respuestas.map((opcion, i) => {



      return(
        <div key={i} >
          <label className="option" style={{display:"block", width:"100%", height:"100%", cursor:"pointer"}}>
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
              //checked={opcion.idRespuesta ==preguntaActual.idRespuesta }for="opt-a"
              //
            />
             &nbsp;&nbsp;

              <span
                      style={{ whiteSpace: "pre-wrap", 
                              // respeta espacios y saltos de línea 
                              //border: "1px solid #ccc", 
                               }}
                              dangerouslySetInnerHTML={{ __html: renderMath(opcion.respuesta) }} 
               />
             
            
            </label>
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


      <button className="col-6 btn btn-success"
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

):(activo?(

 <>
 

<div className="d-flex justify-content-center align-items-center"  
  style={{
    fontSize:"40px",
    color:"#ffffff",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    letterSpacing: "1px",
    "width":"100%",
    "height":"300px",
    "background":"linear-gradient(to right, rgb(2, 163, 157), rgb(2, 169, 183), rgb(2, 195, 164), rgb(0, 47, 42))"
    }}>

  {/*aqui va la portada*/}
  
     <span className=""> {areaDisciplinar} </span>

</div>



   <div className="actions">
        
        
      <button className="col-6 btn btn-success ms-auto"
        onClick={siguientePregunta}
        disabled={preguntaActual?.idRespuesta === 0}
        style={{ marginTop: "20px" }}
      >
        
        
        {indice == preguntaActualTotales.length - 1?
            (<>Finalizar</>): (<>Siguiente</>)
        }
      </button>
        </div>

 </>):(<></>)


)



  }

 </>
  );







  
}

export default ExamenPractica;