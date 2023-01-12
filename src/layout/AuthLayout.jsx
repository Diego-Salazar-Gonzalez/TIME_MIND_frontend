import { Outlet,Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'
const AuthLayout = () => {

  const {auth,cargando} = useAuth()
  

  
  return (
    <>
        {auth?.nombre ? <Navigate to={'/inicio/tareas'}/> : <div className='contenedor-Outlet'>
        <Outlet/>
        </div>}
        
        
    </>
  )
}

export default AuthLayout