import { Column, DataGrid } from "devextreme-react/data-grid";
import Popup from "devextreme-react/popup";





const Resultado= (props) => {


  const {isVisible,setisVisible,data}=props;



  const renderCorrectasCell = (data) => {
    return (
      <span style={{ color: 'green', fontWeight: 'bold' }}>
        {data.value}
      </span>
    );
  };

  return (
    <div>  
      <Popup
        visible={isVisible}
        onHiding={() => setisVisible(false)}
        title="Resultado"
        width="90%"
        //maxWidth={"400px"}
        height="auto"
        showCloseButton={true}
        dragEnabled={true}
      >

    <DataGrid
      dataSource={data}
      keyExpr="idAreaDisciplinar"
      showBorders={true}
    >
      <Column dataField="areaDisciplinar" caption="Área Disciplinar" />
      <Column dataField="total" caption="Total" />
      <Column dataField="correctas" caption="Correctas" 
         cellRender={renderCorrectasCell}
      />
      {/* No agregamos columnas para idAspirante ni idAreaDisciplinar */}
    </DataGrid>


      </Popup>
    </div>
  );
};

export default Resultado;


