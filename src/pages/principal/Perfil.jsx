import { useState } from 'react'
import PerfilVacio from '../../img/perfil-vacio.png'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'
import Alerta from '../../components/Alerta'
const Perfil = () => {
  const {subirImagen,auth,actualizarPerfil,cambiarPassword} = useAuth()

  const [name,setName] = useState('')
  const [mail,setMail] = useState('')
  const [urlImagen,setUrlImagen] = useState('')
  const [imagen,setImagen] = useState(null)
  const [password,setPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [alerta,setAlerta] = useState({})
  const [activar,setActivar] = useState(false)
  const {nombre,email,_id} = auth
  
  
  const handleSubmit = async() =>{

   

   
    //tengo que usar los mismos nombres porque asi los espera la api
    const resultado = await actualizarPerfil({nombre : name || nombre, email : mail || email,id:_id})
   
    setAlerta({msg: resultado})

    setTimeout(() => {
      setAlerta({})
    }, 3000);
    
    if(imagen){
      console.log(imagen)
       subirImagen({imagen})
    }

    if(password){
     
      const respuesta =  await cambiarPassword({pwd_actual: password,pwd_nuevo: newPassword})
      
      setAlerta({msg: respuesta})

      //LIMPIANDO
     
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }
   
   
   
  }

  const handleActivarPass = () =>{
    if(activar){
      setActivar(false)
    }else{
      setActivar(true)
    }
  }
  useEffect(() => {
    const url = `${import.meta.env.VITE_BACKEND_URL_IMAGE}/${auth.imagen}`

    if(auth.imagen){
      setUrlImagen(url)
    }else{
      setUrlImagen(PerfilVacio)
    }

    
  }, [auth])
    const {msg} = alerta
  return (
    <>
     
    
    <div className="perfil">
    <div className="perfil__password">
        <button onClick={handleActivarPass}>{activar ? 'ocultar Cambiar Contraseña' : 'Cambiar Contraseña'}</button>
      </div>
     
      <h2>Perfil</h2>
      <div className="perfil__imagen">
        
        <img className='perfil__imagen--foto' src={urlImagen} alt="foto perfil" />
        <input type="file" name='files'  onChange={e => setImagen(e.target.files)}/>
      </div>
      {msg && <Alerta alerta={alerta}/>}
      <div className="perfil__info">
        <div>
        <label htmlFor="">Nombre: </label>
        <input type="text" defaultValue={nombre} onChange={ e => setName(e.target.value)}/>
        </div>
       <div>
        <label htmlFor="">Email: </label>
       <input type="email" defaultValue={email} onChange={e => setMail(e.target.value)} />
       </div>
       <div className={`perfil__info--contraseña-${activar ? 'activar' : 'desactivar'}`}>
        <label htmlFor="">Contraseña Actual: </label>
       <input type="password" onChange={e =>setPassword(e.target.value)} />
       </div>
       <div className={`perfil__info--contraseña-${activar ? 'activar' : 'desactivar'}`}>
        <label htmlFor="">Nueva Contraseña: </label>
       <input type="password"  onChange={e =>setNewPassword(e.target.value)}/>
       </div>
       <button onClick={handleSubmit}>Guardar Cambios</button>
       

      </div>
    </div>
    </>
  )
}

export default Perfil