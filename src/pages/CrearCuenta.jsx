import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const CrearCuenta = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alerta, setAlerta] = useState({});


  const handleSubmit = async e =>{
    e.preventDefault()

    if([nombre,email,password,password2].includes('')){
      setAlerta({msg: 'Faltan Campos por llenar',error: true})
      return
    }

    if(password !== password2){
      setAlerta({msg: 'Las contraseñas no son iguales', error: true})
      return
    }

    if(password.length < 6){
      setAlerta({msg: 'La contraseña debe tener al menos 6 caracteres', error: true})
      return
    }
    setAlerta({})
    try {
      await clienteAxios.post('/users',{nombre,email,password})
      setAlerta({msg:'Cuenta Creada Correctamente', error: false})
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
    

  }

  const { msg } = alerta

  return (
    <>
      <div className="texto-Login">
        <h1 className="texto-login__h1">
          Crea Una Cuenta y Administra tu Tiempo
        </h1>
      </div>
      <div className="formulario-auth">
        <form
        onSubmit={handleSubmit}
        >
          {msg &&  <Alerta
          alerta={alerta}
          />}
         

          <div>
            <label htmlFor="nombre">Nombre</label>
          </div>
          <input
            type="text"
            id="nombre"
            placeholder="Ingresar Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <div>
            <label htmlFor="email">Correo</label>
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
            <label htmlFor="password">Contraseña</label>
          </div>
          <input
            type="password"
            id="password"
            placeholder="Tu Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <label htmlFor="Rep-password">Repetir Contraseña</label>
          </div>
          <input
            type="password"
            id="Rep-password"
            placeholder="Repite tu Contraseña"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <input
            type="submit"
            value="Crear Cuenta"
          />
        </form>

        <nav className="navigate">
          <Link to="/" className="navigate__link">
            Iniciar Sesion
          </Link>
          <Link to="/recuperar" className="navigate__link">
            Recuperar Mi Cuenta
          </Link>
        </nav>
      </div>
    </>
  );
};

export default CrearCuenta;
