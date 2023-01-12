import useTareas from "../hooks/useTareas"
import Swal from 'sweetalert2'
import Modal from "./Modal"
import { useState } from "react"
const Tarea = ({tarea}) => {
    const {nombre,tiempo,descripcion,_id} = tarea
    const {eliminarTarea,Editar} = useTareas()
    const [animar,setAnimar] = useState(false)
    const [modal,setModal] = useState(false)
    const handleEliminar = () =>{
      Swal.fire({
        title: `Eliminar '${nombre}'?`,
        text: "Esta Accion No se Puede Deshacer",
        icon: 'warning',
        width: 400,
        heightAuto: true,
        padding: '4em',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {

          eliminarTarea(_id)


          Swal.fire(
            'Tarea Eliminada',
            '',
            'success'
          )
        }
      })
    }
    
    const handleEditar = () =>{
      Editar({nombre,tiempo,descripcion,_id})
      
      setModal(true)
      setTimeout(() => {
        setAnimar(true)
      }, 300);
    }


  return (
    <div className="Tarea">
        <p className="Tarea__nombre">Tarea: <span>{tarea.nombre}</span></p>
        <p className="Tarea__tiempo">Tiempo: <span>{tarea.tiempo} Minutos</span></p>
        <p className="Tarea__descripcion">Descripcion: <span>{tarea.descripcion}</span></p>
        <div className="Tarea__botones">
            <button  onClick={handleEditar} className="Tarea__botones--editar">Editar</button>
            <button onClick={handleEliminar}   className="Tarea__botones--eliminar">Eliminar</button>
            
        </div>
        {modal &&<Modal setAnimar={setAnimar} setModal={setModal} animar={animar}/>}

    </div>
  )
}

export default Tarea