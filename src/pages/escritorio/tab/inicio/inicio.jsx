// App.js
import React, { useCallback, useEffect, useState } from 'react';
import PieChart, {
  Series,
  Label,
  Connector,
  Legend
} from 'devextreme-react/pie-chart';


import { Titulo } from '../../componentes/titulo';
import { consultaDatosGeneralPanel, getDocumentosValidados, getPanelInformacion } from './service/inicioApi';
import { useSelector } from 'react-redux';


/*
     public int idAspirante {  get; set; }
   public string agendado { get; set; }
   public int cantidadAgendado { get; set; }
   public string colorAgendado { get; set; }
   public string aprobado { get; set; }
   public int cantidadAprobado { get; set; }
   public string colorAprobado { get; set; }
   public string noAprobado { get; set; }
   public int cantidadNoAprobado { get; set; }
   public string colorNoAprobado { get; set; }
   public string anulado { get; set; }
   public int cantidadAnulado { get; set; }
   public string colorAnulado { get; set; }

*/



const Grafica=(props)=>{

    const {data}=props;


 const Fuentedata = [
  { examenAcreditado: 'Aprobados', value:data[0]?.cantidadAprobado  ,color_:data[0]?.colorAprobado},
  { examenAcreditado: 'Pendientes', value: data[0]?.cantidadAgendado,color_:data[0]?.colorAgendado },
  { examenAcreditado: 'No Aprovados', value: data[0]?.cantidadNoAprobado,color_:data[0]?.colorNoAprobado },
  { examenAcreditado: 'Anulado', value: data[0]?.cantidadAnulado,color_:data[0]?.colorAnulado },
];


  return(
     <div style={{ width: "100%" }}>
      <PieChart
        id="Examenes"
        dataSource={Fuentedata}
        //palette="color"
        type="doughnut"
        title="Exámenes aprobados"
        width="100%"
        height="auto"
        sizeGroup="examenAcreditado"              //  agrupa tamaño si hay varios
        resolveLabelOverlapping="shift" //  evita que se encimen etiquetas
      >
        <Series
          argumentField="examenAcreditado"
          valueField="value"
          colorField="color_"
        >
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>
        <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="center"
          verticalAlignment="bottom"
        />
      </PieChart>
    </div>

  );


}

const PanelInformacion=(props)=>{

  const {data,DatoGeneral_}=props;
  
    return(
    <>
      <div className='row'>
        <div className='col-4'>
          <p style={{ fontSize: "12px",fontWeight:500}}>
            Límite de certificación
            </p> 
        </div>
        <div className='col-4'>
           <p style={{ fontSize: "12px",fontWeight:500}}>
            # de Control
            </p>
        </div>
        <div className='col-4'>
            <p style={{ fontSize: "12px",fontWeight:500}}>
            Fecha certificación nivel secundaria
            </p> 
        </div>
       </div>


       <div className='row'>
        <div className='col-4'>
            <p style={{ fontSize: "14px",fontWeight:700}}>
              19 de Marzo 2027
            </p> 
        </div>
        <div className='col-4'>
              <p style={{ fontSize: "14px",fontWeight:700}}>
              {DatoGeneral_.numeroControl}
            </p>
        </div>
        <div className='col-4'>
               <p style={{ fontSize: "14px",fontWeight:700}}>
              16 de Agosto 2013
            </p> 
        </div>
       </div>
       <div className='row'>
        
         <div className='col-12'>
            <hr/>
        </div>
      </div>

     <div className='row'>
        
         <div className='col-6'>
             <p style={{ fontSize: "14px",fontWeight:700}}>
              Documentos
            </p>
        </div>
         <div className='col-6'>
           <p style={{ fontSize: "14px",fontWeight:700}}>
              Requisitos para certificar
            </p> 
        </div>
      </div>


    <div className='row'>
        <div className='col-6'>
           <p> {data[0]?.documentosValidados}/{data[0]?.totalDocumentos} Registros entregados </p> 
        </div>
         <div className='col-6'>
             <p> 0/5 Registros entregados </p>  
        </div>
        
        
      </div>
      <div className='row'>
          <div className='col-6'>
           <div className="progress" style={{ height: '30px' }}>
             <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" 
                 role="progressbar" style={{ width:((data[0]?.documentosValidados/data[0]?.totalDocumentos)*100)+"%"  }} aria-valuenow={data[0]?.documentosValidados} aria-valuemin="0" aria-valuemax={data[0]?.totalDocumentos} >
                   {data[0]?.documentosValidados}/{data[0]?.totalDocumentos}
             </div>
           </div>
        </div>
          <div className='col-6'>
            <div className="progress" style={{ height: '30px' }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" 
                 role="progressbar" style={{ width: `${0}%` }} aria-valuenow={8} aria-valuemin="0" aria-valuemax="5" >
                   0/5
             </div> 
           </div>
        </div>
        
      </div>

       <div className='row'>
        <div className='col-6'>
          <div className='p-2'></div>
           
           
             <div className='' style={{ fontSize: "10px",fontWeight:500}}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
              &nbsp;  
                {data[0]?.documentosValidados} completados
            </div>  
        </div>
         <div className='col-6'>
           <div className='p-2'></div>
             <p style={{ fontSize: "10px",fontWeight:500}}> 0  Completados </p> 
        </div>
        
        
      </div>
    </>
    );

}






export default function Inicio(props){


  const {seguimientoAspirante ,tab}=props;

  const[informacionPanelServicio,SetInformacionPanelServicio]=useState([]);
  const[documentosValidados,setDocumentosValidados]=useState([]);
  const[DatoGeneral,setDatoGeneral]=useState([]);

  const UsuarioLogin = useSelector((state) => state.UsuarioLogin);

  const getPanelInformacionCallback=useCallback(async ()=>{
    
     const result= await getPanelInformacion(UsuarioLogin.idAspirante);
     SetInformacionPanelServicio(result.data);
  },[]);


  const getDocumentosValidadosCallback=useCallback(async ()=>{
    
     const result= await getDocumentosValidados(UsuarioLogin.idAspirante);
     setDocumentosValidados(result.data);
  },[]);


  const getDatoGeneralPanelCallback=useCallback(async ()=>{
    
     const result= await consultaDatosGeneralPanel(UsuarioLogin.idAspirante);
     setDatoGeneral(result.data);

  
  },[]);


  useEffect(
   ()=>{
    
      getPanelInformacionCallback();
      getDocumentosValidadosCallback();
      getDatoGeneralPanelCallback();
   },[]);





  return (
    <React.Fragment>
    <div style={{margin: "10px"}}>
  
   <Titulo estatus={seguimientoAspirante} setTabSectorMensaje={tab}></Titulo>
     <div className='row'>
        <div className='col-4'>
            <Grafica data={informacionPanelServicio}></Grafica>
        </div>
         <div className='col-8'>
         
        
        
          <PanelInformacion data={documentosValidados} DatoGeneral_={DatoGeneral}></PanelInformacion>
        
        
        
        </div>
     </div>
    </div>

    
    </React.Fragment>
  );


}


