import React from "react";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";

/* const data = [
  {
    sede: "León",
    tipoExamen: "Global",
    areaConocimiento: "Matemáticas",
    fecha: "2025-12-20",
    estatusPago: "Pagado",
    puntaje: [
      { area: "Álgebra", valor: 85 },
      { area: "Geometría", valor: 90 },
    ],
  },
  {
    sede: "CDMX",
    tipoExamen: "Área de conocimiento",
    areaConocimiento: "Historia",
    fecha: "2025-12-21",
    estatusPago: "Pendiente",
    puntaje: [
      { area: "Historia Universal", valor: 70 },
      { area: "Historia de México", valor: 80 },
    ],
  },
]; */



/*

  {
    "idAspiranteExamen": 1,
    "sede": "Celaya",
    "fechaExamen": "2026-03-07T00:00:00",
    "areaDisciplinar": "1. Ciencias Sociales",
    "icon": "pdffile",
    "title": "1. Ciencias Sociales"
}

*/

function GridAplicaciones(props) {

const {data, setisVisible,setData}=props;




  return (
    <DataGrid
      dataSource={data}
      keyExpr="idAspiranteExamen"
      showBorders={true}
      columnAutoWidth={true}
    >


      <Grouping autoExpandAll={true} />

    
      <Column dataField="bloque" caption="Bloque"   groupIndex={1} 
         groupCellRender={(cellData) => {

          const {data}=cellData;

          const valor=cellData.value;
          const examenes=data.items;

         

          return (
                <>
                 <div></div>
                  <button
                    className="btn"
                    onClick={() => {
                    
                     setisVisible(true);

                     const informacion= [...examenes];
                 
                     setData(informacion);
                  
                 
                    }
    
                  }
                   >
                    <span>Iniciar {valor==1?(<>primera</>):(<>segunda</>)} parte da clic para comenzar. </span>
                  
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                      <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                    </svg>
                  </button>

                  
                </>
  );

}}
      
      />
      <Column dataField="idOportunidad" caption="Oportunidad"    groupIndex={0} 
          groupCellRender={(cellData) => {
            
               const data=cellData.value;

              return (  
               
                data==1?(

                    <span style={{Color:"rgb(30, 91, 79) !important"}}  >Examen global Oportunidad:{data} </span>
                  ):(<span>Examen área disciplinar</span>)
              

                  
           
              );
         }}
      
      />

      {/* Columna sede */}
      <Column dataField="sede" caption="Sede" />

      {/* Tipo de examen */}
      <Column dataField="areaDisciplinar" caption="Área Disciplinar" />

      {/* Fecha */}
      <Column dataField="fechaExamen" caption="Fecha" dataType="date" />

      {/* Estatus de pago 
      <Column dataField="estatusPago" caption="Estatus de pago" />*/}

      {/* Puntaje dividido por área 
      <Column
        caption="Puntaje por área"
        cellRender={({ data }) => (
          <ul style={{ paddingLeft: "15px" }}>
            {data.puntaje.map((p, i) => (
              <li key={i}>
                {p.area}: {p.valor}
              </li>
            ))}
          </ul>
        )}
      />*/}
{/* 
      <Column
              caption="Acciones"
              cellRender={(cellData) => (
                <div>
    
                  <button
                    className="btn"
                    onClick={() => {
                    
                     setisVisible(true);

                     const informacion= cellData.data;
                 
                     setData(informacion);
                  
                    // debugger;
                 
                    }
    
                  }
                   >
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                      <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                    </svg>
                  </button>

                  
                </div>
              )} 
            />*/}

    </DataGrid>
  );
}

export default GridAplicaciones;
