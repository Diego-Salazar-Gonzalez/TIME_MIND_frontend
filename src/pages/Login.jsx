import { useState,useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});


  const {setAuth,auth} = useAuth()

  const navigate = useNavigate()





  const handleSubmit =  async e =>{
    e.preventDefault()
    if([email,password].includes('')){
      setAlerta({msg:'Hay campos vacios',error:'true'})
      return
      
    }

    try {
      const {data} = await clienteAxios.post('users/login',{email,password})
      setAuth(data)
      localStorage.setItem('token_TimeMind',data.token_TimeMind)

      navigate('/inicio/tareas')
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
    })
    return
    }

    setAlerta({})


    
  }
  const { msg} = alerta

  return (
    <>
      <div className="texto-Login">
        <h1 className="texto-login__h1">
          Inicia Sesion y Administra tu Tiempo
        </h1>
      </div>
      <div className="formulario-auth">
        
        <form onSubmit={handleSubmit}>
        {msg &&<Alerta
        alerta={alerta}
        />}
        
        
          <div>
            <label htmlFor="email">
              Correo
            </label>
          </div>
            
          <input
            type="email"
            id="email"
            placeholder="Ingresar Correo"
            className="formulario__correo--input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <label htmlFor="password">
              Contraseña
            </label>
          </div>
          <input
            type="password"
            id="password"
            placeholder="Tu Contraseña"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="submit"
            value="Iniciar Sesion"
          />
        </form>
        <nav className="navigate">
          <Link to="/registrar" className="navigate__link">
            Crear Cuenta
          </Link>
          <Link to="/recuperar" className="navigate__link">
            Recuperar Mi Cuenta
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
