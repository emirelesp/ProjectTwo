const apiExamen=import.meta.env. VITE_WebApi_URL;



export async function setResetPass(email,token,password)
{
    
const param={
  email:email,
  token: token,
  password: password
}


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
        datos="El servicio no esta disponible.";
    }

    return datos;
}


export async function setRestablecerContrasena(email)
{
    


    const url = apiExamen+'/EnviarGoogle?email='+email;
    let datos='';
    
    try{
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
      });
      
      datos = await respuesta.json();

    }
    catch(error){
        datos="El servicio no esta disponible.";
    }
    
    return datos;
}