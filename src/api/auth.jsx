import defaultUser from '../utils/default-user';

const apiURL_Subdominio=import.meta.env.VITE_WebApi_URL;



export async function signIn(email_, password_) {
  try {
    // Send request
    //console.log(email, password);

    let estaAutorizado=false;
    let data={};

   const respuesta = await fetch(apiURL_Subdominio+'/login?useCookies=true&useSessionCookies=true', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",

              // TODO: Agregamso el espacio para el token aunque a�n no lo usamos/necesitamos/solican en la API
             // Authorization: `Bearer ${token}`
               
          },
          body: JSON.stringify({ email:email_, password:password_ }),
          credentials: "include"/// se almacena la cookie
      });


  

     estaAutorizado=respuesta.ok;

    if (!estaAutorizado) throw new Error("");
    
  
 
    return {
      isOk: estaAutorizado,
      data: data
    };
  }
  catch {
    return {
      isOk: false,
      message: "Error al autentificar."
    };
  }
}

export async function getUser(AsignarReduxUserLogin) {
  try {
    // Send request
 
   let estaAutorizado=false;
   let data={};

   const respuesta = await fetch(apiURL_Subdominio+'/getUsuarioLogin', {
           method: "GET", // o POST según tu método
           credentials: 'include', // 🔑 esto envía la cookie al servidor
    });

     estaAutorizado=respuesta.ok;

    if (estaAutorizado){
       data=await respuesta.json();
    } 
    
    return {
      isOk: estaAutorizado,////aqui va la conexion con la cookie esta en falso para poder trabajar con no auth
      data: data
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(form) {
  try {
     
  const { email, password,nombre,apellidoPaterno,apellidoMaterno,CURP,telefono } = form;

const data=  {
  idAspirante: 0,
  rol: "Aspirante",
  nombre: nombre,
  apellidoPaterno: apellidoPaterno,
  apellidoMaterno: apellidoMaterno,
  curp: CURP,
  telefono: telefono,
  email: email,
  password: password
}
     

      const respuesta = await fetch(apiURL_Subdominio+'/RegistroUsuario', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",

              // TODO: Agregamso el espacio para el token aunque a�n no lo usamos/necesitamos/solican en la API
             // Authorization: `Bearer ${token}`
               
          },
          body: JSON.stringify(data),
          //credentials: "include"
      });


      if (!respuesta.ok) throw new Error("Error al crear Login");

     // const data = await respuesta.json();

    

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "No cumple con las normas."
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
