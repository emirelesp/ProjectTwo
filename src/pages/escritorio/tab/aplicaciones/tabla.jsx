import React from "react";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";

const data = [
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
];

function GridAplicaciones() {
  return (
    <DataGrid
      dataSource={data}
      keyExpr="sede"
      showBorders={true}
      columnAutoWidth={true}
    >
      {/* Columna sede */}
      <Column dataField="sede" caption="Sede" />

      {/* Tipo de examen */}
      <Column dataField="tipoExamen" caption="Tipo de examen" />

      {/* Área de conocimiento */}
      <Column dataField="areaConocimiento" caption="Área de conocimiento" />

      {/* Fecha */}
      <Column dataField="fecha" caption="Fecha" dataType="date" />

      {/* Estatus de pago */}
      <Column dataField="estatusPago" caption="Estatus de pago" />

      {/* Puntaje dividido por área */}
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
      />
    </DataGrid>
  );
}

export default GridAplicaciones;
