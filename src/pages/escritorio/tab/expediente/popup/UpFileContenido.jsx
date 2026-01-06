import React, { useRef } from "react";
import FileUploader from "devextreme-react/file-uploader";
import { Button } from "devextreme-react";


const apiURL_Subdominio=import.meta.env.VITE_WebApi_URL;

function UpFileContenido() {

   const formRef = useRef(null);

  const handleUpload = async (e) => {
   // e.file.name
   debugger;


   // const file =  e.value[0]; // primer archivo seleccionado
   // if (!file) return;


 e.preventDefault();///no refresh
 const formData = new FormData(formRef.current);

 //   const formData = new FormData();
   // formData.append("file", file);

    try {
      const response = await fetch(apiURL_Subdominio+"/Documento/File", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Error al subir archivo");
      }

      const data = await response.json();
      alert("Archivo subido: " + data.fileName);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
  <>
     <FileUploader
      name="file"
      selectButtonText="Seleccionar archivo"
      labelText="o arrastra aquí"
      uploadMode="useButtons"
      uploadUrl={apiURL_Subdominio+"/Documento/File"}
      multiple={false}
      //onValueChanged={handleUpload}
     // onUploaded={}
    />
  

    
    <form  ref={formRef} onSubmit={handleUpload}>
    <FileUploader
      name="file"
      selectButtonText="Seleccionar archivo"
      labelText="o arrastra aquí"
      uploadMode="useform"
      multiple={false}
      //onValueChanged={handleUpload}
     // onUploaded={}
    />

      <Button
        text="Enviar"
        type="success"
        useSubmitBehavior={true} // hace que el botón dispare el submit del form
      />
    </form>
    </>
  );

}

export default UpFileContenido;
