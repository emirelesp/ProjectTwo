import DataGrid, { Column } from "devextreme-react/data-grid";




function GridResultado(props) {

const {catalogoResultados}=props;




  return (
    <DataGrid
      dataSource={catalogoResultados}
      showBorders={true}
      columnAutoWidth={true}
      keyExpr="idAspiranteExamen"
    >

      {/*<Column dataField="idAspiranteExamen" caption="idAspiranteExamen" visible="false"  />*/}
      {/* sede */}
      <Column dataField="sede" caption="Sede" />
         {/* fecha */}
      <Column dataField="fechaExamen" caption="Fecha de aplicación" dataType="date"/>

      {/* conocimiento */}
      <Column dataField="areaDisciplinar" caption="Asignaturas"  /> {/** Componente formativo */}

      {/* conocimiento */}
      <Column dataField="puntaje" caption="Puntaje"  />



     <Column
        caption="Resultado"
        cellRender={({ data }) => {
          /// debugger;
          return(

                 
                    <div className="bg-success">
                       Aprobada
                    </div>
          )


        }}
      />

      {/* Acciones */}
   
    </DataGrid>
  );
}

export default GridResultado;
