const apiExamen=import.meta.env.VITE_WebApi_URL;
const dominio_=import.meta.env.VITE_LocalBase_URL;



export async function setResetPass(email,token,password)
{
    
const param={
  email:email,
  token: token,
  password: password
}

let datos={ Message: "Contraseña cambiada exitosamente", isOk : true};

    const url = apiExamen+'/resetPass';
    
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(param)
      });
      
      datos = await respuesta.json();

    }
    catch(error){
        datos.Message="El servicio no esta disponible.";
        datos.isOk=false;
    }

    return datos;
}


export async function setRestablecerContrasena(email)
{
    const param={
      email:email,
      dominio: dominio_,
    }

    const url = apiExamen+'/EnviarTokenResetPassword';
    let datos='';
    
    try{
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(param)
      });
      
      datos = await respuesta.json();

    }
    catch(error){
        datos="El servicio no esta disponible.";
    }
    
    return datos;
}