import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SingleCard } from './layouts';
import { LoginForm, ResetPasswordForm, ChangePasswordForm, CreateAccountForm } from './components';
import './css/global.css'
import { useCallback } from 'react';



const Plantilla =({titulo,children})=>{


  const navigate = useNavigate();

    return(

     <div  style={{width:"100%",height:"100%"}}>

      <div className='container-fluid' style={{ background:"linear-gradient(to right,  #ffffff)"}}>
        
        <div className='row p-1' style={{backgroundColor:"white"}}>
              <div className='col-2 text-center'>
                  <img src='/logos/LOGO CONALEP-02.svg' height="60px" />
              </div>
              <div className='col-2'>
                    <img src='/logos/Acuerdo.jpeg' height="60px" />
              </div>

        </div>

           <div className='row' style={{background:"linear-gradient(to right, #02A39D, #02A9B7, #02C3A4, #002f2a)"}}>
              <div className='col-12 text-center'>
                  <div  style={{height:"250px"}} >
                       <div className='p-4 titularesCremita'><span>BIENVENIDO</span></div>
                       <div className='titularesLineaBlanca'>
                       <span>
                        Al registrarte en el Sistema tienes acceso al servicio para la gestión de tu
                        <br/>
                        examen para acreditar la preparatoria y mucho más.
                       </span>
                        </div>

                        <div className='titularesLineaBlanca p-1'>¿Ya estás registrado?</div>
                       <div className='col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 mx-auto p-2'>
                        <button onClick={
                                    ()=>{
                                    navigate("/login");
                                    }
                        }
                          className='btn' style={{ fontFamily:"'Lato', sans-serif", fontSize:"16px",backgroundColor:"#a57f2c", color:"white", borderRadius:"30px", padding:"10px",width:"100%"}}>

                          INGRESAR
                        </button>
                        </div>


                    </div>
              </div>
          

        </div>
   <div className='p-2'></div>

      <div className='row titulares text-center p-2'> <span>{titulo}</span></div>
      <div className='row tema text-center p-2'> <span>Salvo indicación contraria, todos los campos son obligatorios</span></div>
     <div className='p-2'></div>
          {children }
  
      </div>

     </div>


    ); 

}


export default function UnauthenticatedContent() {

  const navigate = useNavigate();
 const registrar = useCallback (() => {
    navigate('/create-account');
  }, [navigate]);



  return (
    <Routes>
      <Route
        path='/login' 
        element={

         <div style={{width:"100%",height:"100%", background:"linear-gradient(to right, #02A39D, #02A9B7, #02C3A4, #002f2a)"}}>



<div className='container'>

         <div className='p-4'></div>
          <div className='row text-center'>
       
                 <img src='/logos/LOGO CONALEP-01.svg' height="180px" />
            
          </div>
          <div className='row text-center titularesLinea' style={{color:"white"}}>
            
             <span >REGISTRO DE EXAMEN DE CERTIFICACIÓN</span>
              <span >DE NIVEL MEDIO SUPERIOR</span>
             
          </div>
          <div className='row text-center p-2 subtitularesLinea' style={{color:"white" }}>
          
              <span>¿Usuario nuevo? <span onClick={registrar} style={{display: "inline",textDecoration: "underline",cursor:'pointer'}}>Crea tu cuenta gratuitamente.</span></span>
          
          </div>

<div className='row text-center p-1 tema'style={{color:"white" }} >
 
        <span>BIENVENIDO</span>
    
 
 
   <span>Ingresa tu cuenta para continuar.</span>
  
   
</div>

     
             <LoginForm />
    </div>
        

 

          {/* <SingleCard title="Sign In">
           
          </SingleCard> */}
        </div>
        }
      />
      <Route
        path='/create-account'
        element={

          <Plantilla titulo="REGISTRO">
          
        <div className='col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 mx-auto p-2'>
            <CreateAccountForm />
          </div>
        
          </Plantilla>
        }
      />
      <Route 
        path='/reset-password'
        element={
          // <SingleCard
          //   title="Restablecer Contraseña"
          //   description=""
          // >
            <Plantilla titulo="RESTABLECER CONTRASEÑA">
          
        <div className='col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10 mx-auto p-2'>
            <ResetPasswordForm />
            </div>
          </Plantilla>

          //</SingleCard>
        }
      />
      <Route
        path='/change-password/:recoveryCode'
        element={
          <SingleCard title="Change Password">
            <ChangePasswordForm />
          </SingleCard>
        }
      />
      <Route path='*' element={<Navigate to={'/login'} />}></Route>
    </Routes>
  );
}
