import { Outlet, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import useTareas from "../hooks/useTareas";
const InicioLayout = () => {
 
  const {cacheTareas,setTareas} = useTareas()
  const {auth,cerrarSesion,cargando} = useAuth()
 


 
  
  return (
    <>
    {auth?.nombre ? <div className="contenedor-principal">
        <aside className="contenedor-principal__barra">
           <h2>TimeMind</h2>
            <nav className="contenedor-principal__barra--navegacion">
                <Link to='tareas'>Tareas</Link>
                <Link to='perfil'>Perfil</Link>
                <Link to='' onClick={cerrarSesion}>Cerrar Sesion</Link>
            </nav>
        </aside>
        <main className="contenedor-principal__contenido">
          <Outlet/>
        </main>
      </div> : <Navigate to={'/'} />}
     
      
    </>
  );
};

export default InicioLayout;
