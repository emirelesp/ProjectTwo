import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getValidadorDictamen } from "./service/api";




function DictamenPagina() {

   const [parametros,setParametro]=useSearchParams();
    const [sustentante, setSustentante] = useState({
                                                    nombre: "",
                                                    uuid: "",
                                                    folio: "",
                                                    fechaEvaluacion: "",
                                                    fechaRegistro: "",
                                                    aprobado: "", // true = aprobado, false = no aprobado
                                                    asignaturasAprobadas: 0,
                                                    totalAsignaturas: 0
                                                  });
  
    
    const idAspirante= parametros.get("idAspirante");
    const idOportunidad= parametros.get("idOportunidad");
    const fechaExamen= parametros.get("fechaExamen");

const datacallback=useCallback(async ()=>{

  const result= await getValidadorDictamen(idAspirante,idOportunidad,fechaExamen);
  if (result.length>0)
  setSustentante(result[0]);

},[idAspirante,idOportunidad,fechaExamen])



useEffect(()=>{

  datacallback();

},[idAspirante,idOportunidad,fechaExamen])


  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center fw-bold">
            {sustentante.nombre}
          </h3>
          <p><strong>Tipo de documento:</strong> Dictamen MiPrepa286</p>
          <p><strong>Folio:</strong> {sustentante.uuid}</p>
          <p><strong>Nivel Educativo:</strong> Medio Superior</p>
          <p><strong>Fecha:</strong> {sustentante.fechaEvaluacion}</p>
          <p><strong>Institución Educativa:</strong> CONALEP Guanajuato</p>
          <p><strong>Fecha de registro en MiPrepa286:</strong> {sustentante.fechaRegistro}</p>
          
          <hr />
          <h5 className={
            sustentante.aprobado=="APROBADO" ? "text-success" : "text-warning"
          }>
            {sustentante.aprobado}
          </h5>
          <p>
            Asignaturas aprobadas:{" "}
            {sustentante.asignaturasAprobadas} de {sustentante.totalAsignaturas}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DictamenPagina;
