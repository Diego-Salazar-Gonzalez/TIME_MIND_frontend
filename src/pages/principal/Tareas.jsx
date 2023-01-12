import { useState,useEffect } from "react";
import ListadoTareas from "../../components/ListadoTareas";
import imgAñadir from "../../img/imgAñadir.svg";
import Modal from "../../components/Modal";
import useAuth from "../../hooks/useAuth";
import useTareas from "../../hooks/useTareas";
export default function Tareas() {

  const {auth} = useAuth()
  const [modal, setModal] = useState(false);
  const [animar,setAnimar] = useState(false)
  const [listaTareas,setListaTareas] = useState([])
 
 
  
 
  
  const handleModal = () =>{
    setModal(true)
    setTimeout(() => {
      setAnimar(true)
    }, 300);
  }

 
 
  
 
  

  
  
  return (
    <>
      <div className="tareas">
        <div className="tareas__header">
          <h2>
            Hola <span>{auth.nombre}</span>
          </h2>
          <div className="tareas__header--boton">
            <p>Añadir Tarea</p>
            <img src={imgAñadir} alt="añadir tarea" onClick={handleModal} />
          </div>
        </div>
        {modal && <Modal setAnimar={setAnimar} setModal={setModal} animar={animar}
          
          />
       }

        {<ListadoTareas/>}
      </div>
    </>
  );
}
