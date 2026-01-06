import React from "react";
import DataGrid, { Column } from "devextreme-react/data-grid";
import Button from "devextreme-react/button";

const requisitosData = [
  {
    requisito: "Acta de nacimiento",
    fecha: "2025-12-20",
    estatus: "Entregado",
  },
  {
    requisito: "CURP",
    fecha: "2025-12-21",
    estatus: "Pendiente",
  },
  {
    requisito: "Pago",
    fecha: "2025-12-22",
    estatus: "Pagado",
  },
];

function GridCertificacion() {
  return (
    <DataGrid
      dataSource={requisitosData}
      showBorders={true}
      columnAutoWidth={true}
      keyExpr="requisito"
    >
      {/* Requisito */}
      <Column dataField="requisito" caption="Requisito" />

      {/* Fecha */}
      <Column dataField="fecha" caption="Fecha" dataType="date" />

      {/* Estatus */}
      <Column dataField="estatus" caption="Estatus" />

      {/* Acciones */}
      <Column
        caption="Acciones"
        cellRender={({ data }) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              text="Ver"
              onClick={() => alert(`Ver detalle de ${data.requisito}`)}
            />
            <Button
              text="Editar"
              onClick={() => alert(`Editar ${data.requisito}`)}
            />
          </div>
        )}
      />
    </DataGrid>
  );
}

export default GridCertificacion;
