import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
function RecuperarCuenta() {
  const [email, setEmail]   = useState("");
  const [alerta,setAlerta] = useState({})
  
  const handleSubmit = e =>{
    e.preventDefault()
    if(email === ''){
      setAlerta({msg: 'El campo esta vacio', error: true})
      return
    }
    setAlerta({msg: 'Mensaje Enviado',error: false})
    setTimeout(() => {
      setAlerta({})
      
    }, 3000);

    
   
  }

  const {msg} = alerta
  

  return (
    <>
      <div className="texto-Login">
        <h1 className="texto-login__h1">
          Recupera Tu Cuenta y Administra Tu Tiempo
        </h1>
      </div>

      <div className="formulario-auth">
        <form 
        onSubmit={handleSubmit}
        >
          {msg && <Alerta
          alerta={alerta}
          />}
          <div>
            <label htmlFor="email">Correo</label>
          </div>

          <input type="email" id="email" placeholder="Ingresa Tu Correo" value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <input type="submit" value="Enviar" />
        </form>
        <nav className="navigate">
          <Link to="/" className="navigate__link">
            Iniciar Sesion
          </Link>
          <Link to="/registrar" className="navigate__link">
            Crear Cuenta
          </Link>
        </nav>
      </div>
    </>
  );
}

export default RecuperarCuenta;
