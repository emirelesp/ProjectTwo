import { useCallback, useEffect, useState } from "react";
import Pregunta from "../aplicaciones/componente/pregunta";
import Examen from "../aplicaciones/examen";
import { getPreguntasExamenModulo } from "../aplicaciones/service/aplicacionesApi";

 const TestPreguntasDiseño=(props)=>{

    

   const {informacionGridClic,preguntaActualTotales, setPreguntaActualTotales,setIsExamen} = props;

   return(
        <>
        
     <Examen 
      setIsExamen={setIsExamen}
      datosArea={informacionGridClic}  
      preguntaActualTotales={preguntaActualTotales} 
      setPreguntaActualTotales={setPreguntaActualTotales}/>

        </>
   );

}



export const PreguntaNuevoDiseño=(props)=>{


  const {setIsExamen}=props;

    const informacionGridClic=[
       {
            "idAspiranteExamen": 33,
            "sede": "Celaya",
            "fechaExamen": "2026-03-09T00:00:00",
            "areaDisciplinar": "1. Ciencias Sociales",
            "icon": "pdffile",
            "title": "1. Ciencias Sociales",
            "idOportunidad": 1,
            "bloque": 1
        },
        {
                "idAspiranteExamen": 34,
                "sede": "Celaya",
                "fechaExamen": "2026-03-09T00:00:00",
                "areaDisciplinar": "2. Ciencias Experimentales",
                "icon": "pdffile",
                "title": "2. Ciencias Experimentales",
                "idOportunidad": 1,
                "bloque": 1
      },

];



  const [preguntaActualTotales, setPreguntaActualTotales] = useState([]);
   

  const preguntasdefault= useCallback(async ()=>{



    const result=  await getPreguntasExamenModulo(informacionGridClic, 'a9eb665f'); 
     setPreguntaActualTotales(result)
   },[]);

  useEffect(()=>{
    preguntasdefault();
  },[]);


  

 
  return(
    <>
    <TestPreguntasDiseño
              setIsExamen={setIsExamen}
             informacionGridClic={informacionGridClic}
             preguntaActualTotales={preguntaActualTotales}
            setPreguntaActualTotales={setPreguntaActualTotales}
       
    >
        
    </TestPreguntasDiseño>
  
    </>
  );

}