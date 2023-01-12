import { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useTareas from "../hooks/useTareas";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  

  useEffect(() => {
   
   
    const autenticar = async () => {
      const token_TimeMind = localStorage.getItem("token_TimeMind");
      if (!token_TimeMind) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_TimeMind}`,
        },
      };
      try {
       
        const { data } = await clienteAxios("/users/perfil", config);

        setAuth(data);
      
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({}); //temas de seguridad eliminar los datos
      }
      setCargando(false);
    };
    autenticar();
  }, []);

  const subirImagen = async (datosNuevos) => {
    const token_TimeMind = localStorage.getItem("token_TimeMind");
    if(!token_TimeMind) return
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token_TimeMind}`,
      },
    };

   
    if (datosNuevos.imagen[0]) {

      try {
        const datos = new FormData();
        datos.append("name", datosNuevos.imagen[0]);
        const respuesta = await clienteAxios.put(
          "/users/perfil/imagen",
          datos,
          config
        );
       
        setAuth(respuesta.data); //perfil acutalizado seteado en el state global
        
      } catch (error) {
        console.log(error)
      }
    
    }

  };

  const actualizarPerfil = async(datos) =>{
    const token_TimeMind = localStorage.getItem("token_TimeMind");
    if(!token_TimeMind) return
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_TimeMind}`,
      },
    };
   try {
    const {data} = await clienteAxios.put(`/users/perfil/${datos.id}`, datos, config);
   
    setAuth(data.data)
    return data.msg
  
   } catch (error) {
    return(error.response.data.msg)
   }
  
  
  }

  const cerrarSesion = () =>{
    localStorage.removeItem('token_TimeMind')
    setAuth({})
  }

  const cambiarPassword = async(datos) =>{
    const token_TimeMind = localStorage.getItem("token_TimeMind");
    if(!token_TimeMind) return
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_TimeMind}`,
      }, 
    };

    try {
     const {data} =  await clienteAxios.put(`/users/password`, datos, config)
     console.log(data)
     return data.msg
    } catch (error) {
     return(error.response.data.msg)
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, subirImagen,actualizarPerfil,cerrarSesion,cambiarPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
